<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse text-sm">
      <thead class="[&_tr]:border-b">
        <tr
          class="border-b transition-colors"
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            class="h-12 px-4 text-left align-middle font-medium text-muted-foreground hover:text-foreground"
            :class="[header.column.getCanSort() && 'cursor-pointer select-none']"
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <div class="flex items-center gap-3">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
              <Icon
                v-if="header.column.getCanSort() && header.column.getIsSorted() === 'asc'"
                name="heroicons:chevron-up"
                class="h-4 w-4"
              />
              <Icon
                v-else-if="header.column.getCanSort() && header.column.getIsSorted() === 'desc'"
                name="heroicons:chevron-down"
                class="h-4 w-4"
              />
              <Icon
                v-else-if="header.column.getCanSort()"
                name="heroicons:chevron-up-down"
                class="h-5 w-5"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b transition-colors hover:bg-muted/50"
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :class="[row.getIsSelected() && 'bg-muted/50']"
        >
          <td
            class="whitespace-nowrap p-4 align-middle"
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showPagination" class="flex w-full items-center justify-between px-3 py-5">
      <div class="flex items-center gap-2.5">
        <UIButton
          @click="table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
          variant="outline"
          class="h-8 w-8"
          size="icon-sm"
        >
          <Icon name="heroicons:chevron-double-left" class="h-4 w-4" />
        </UIButton>
        <UIButton
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
          variant="outline"
          class="h-8 w-8"
          size="icon-sm"
        >
          <Icon name="heroicons:chevron-left" class="h-4 w-4" />
        </UIButton>
        <UIButton
          @click="table.nextPage()"
          :disabled="!table.getCanNextPage()"
          variant="outline"
          class="h-8 w-8"
          size="icon-sm"
        >
          <Icon name="heroicons:chevron-right" class="h-4 w-4" />
        </UIButton>
        <UIButton
          @click="table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
          variant="outline"
          class="h-8 w-8"
          size="icon-sm"
        >
          <Icon name="heroicons:chevron-double-right" class="h-4 w-4" />
        </UIButton>
      </div>
      <div class="flex items-center gap-7 text-sm">
        <div class="flex items-center gap-3">
          <!-- Add select for changing rows per page -->
          <span class="whitespace-nowrap"> Rows per page </span>
          <UISelect
            placeholder=" "
            class="h-8 w-14 px-2 text-xs sm:text-xs"
            :options="rowsPerPage"
            :model-value="table.getState().pagination.pageSize"
            @update:model-value="table.setPageSize(Number($event))"
          >
            <option
              class="bg-background"
              v-for="pageSize in rowsPerPage"
              :key="pageSize"
              :value="pageSize"
            >
              {{ pageSize }}
            </option>
          </UISelect>
        </div>
        <div>
          Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }} -
          {{ table.getFilteredRowModel().rows.length }}
          results
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type ColumnDef,
  } from "@tanstack/vue-table";

  import CheckBox from "@/components/UI/Checkbox.vue";

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      /**
       * Table headers
       */
      columns?: ColumnDef<any>[];
      /**
       * Table data
       */
      data: any[];
      /**
       * Search string
       */
      search?: string;
      /**
       * Page size
       */
      pageSize?: number;
      /**
       * Show pagination
       */
      showPagination?: boolean;
      /**
       * Rows per page
       */
      rowsPerPage?: number[];
    }>(),
    {
      data: () => [],
      search: () => "",
      pageSize: () => 5,
      showPagination: () => true,
      rowsPerPage: () => [5, 10, 25, 50, 100],
    }
  );

  const checkBoxHeader: ColumnDef<any> = {
    id: "checkbox",
    header: ({ table }) => {
      return h(CheckBox, {
        checked: table.getIsAllRowsSelected(),
        onChange: (e: any) => table.toggleAllRowsSelected(e.target.checked),
        indeterminate: table.getIsSomeRowsSelected(),
      });
    },
    cell: ({ row }) => {
      return h(CheckBox, {
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        onChange: row.getToggleSelectedHandler(),
      });
    },
    enableSorting: false,
    enableHiding: false,
  };

  const localColumns: ColumnDef<any>[] = [...props.columns];

  if (props.modelValue) {
    localColumns.unshift(checkBoxHeader);
  }

  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const selected = computed({
    get() {
      return props.modelValue || [];
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  const localData = ref(props.data);

  const sorting = ref([]);

  const table = useVueTable({
    get data() {
      return localData.value;
    },
    columns: localColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: () => !!props.modelValue,
    onRowSelectionChange: (rows) => {
      selected.value = rows(selected.value);
    },
    initialState: {
      pagination: {
        pageSize: props.pageSize,
      },
      rowSelection: selected.value,
      globalFilter: props.search,
    },
    state: {
      get rowSelection() {
        return selected.value;
      },
      get sorting() {
        return sorting.value;
      },
      get globalFilter() {
        return props.search;
      },
    },
    onSortingChange: (sort) => {
      sorting.value = typeof sort === "function" ? sort(sorting.value) : sort;
    },
  });
</script>
