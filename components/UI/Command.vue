<template>
  <HCombobox
    :by="by"
    :model-value="modelValue"
    :multiple="multiple"
    :nullable="nullable"
    @update:model-value="onUpdate"
    as="div"
    class="w-full overflow-hidden rounded-lg border bg-background shadow-sm"
  >
    <div class="relative w-full">
      <slot name="icon">
        <div class="absolute inset-y-0 left-2 flex items-center justify-center">
          <Icon v-if="icon" :name="icon" class="h-4 w-4 text-muted-foreground" />
        </div>
      </slot>
      <HComboboxInput
        :placeholder="placeholder"
        ref="comboBoxInput"
        autocomplete="off"
        :class="[icon && 'pl-8']"
        :value="query"
        class="h-11 w-full bg-transparent px-3 py-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        @change="query = ($event.target as any).value"
      />
    </div>
    <HComboboxOptions v-if="options.length" class="border-t" static hold>
      <div class="p-1">
        <template v-for="(item, i) in filteredOptions" :key="i">
          <HComboboxOption :value="item" v-slot="{ active, selected }" v-if="!item.children">
            <UICommandItem :item="item" :active="active" :selected="selected" />
          </HComboboxOption>
          <div v-else class="my-1.5 p-1 pt-3 first:mt-0" :class="[item.divider]">
            <p class="mb-3 px-2 text-xs font-medium text-muted-foreground">{{ item.label }}</p>
            <div>
              <template v-for="(child, k) in item.children" :key="`child-${k}`">
                <HComboboxOption :value="child" v-slot="{ active, selected }">
                  <UICommandItem :item="child" :active="active" :selected="selected" />
                </HComboboxOption>
              </template>
            </div>
          </div>
        </template>
        <div v-if="query && filteredOptions.length == 0">
          <slot :query="query" name="no-results">
            <div class="p-2 py-10 text-center text-sm text-muted-foreground">No results found</div>
          </slot>
        </div>
      </div>
    </HComboboxOptions>
  </HCombobox>
</template>

<script setup lang="ts">
  export interface CommandOption {
    title?: string;
    icon?: string;
    avatar?: string;
    click?: Function;
    to?: string;
    href?: string;
    target?: string;
    disabled?: boolean;
    label?: string;
    shortcut?: string;
    divider?: string;
    children?: CommandOption[];
  }

  const query = ref("");
  const comboBoxInput = ref();

  const props = withDefaults(
    defineProps<{
      icon?: string;
      placeholder?: string;
      options?: CommandOption[];
      multiple?: boolean;
      nullable?: boolean;
      modelValue?: any[];
      by?: string;
    }>(),
    {
      options: () => [],
      icon: "heroicons:magnifying-glass",
      placeholder: "Search...",
      by: "title",
    }
  );

  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const onUpdate = (value: any) => {
    emit("update:modelValue", value);
  };

  const filteredOptions = computed(() => {
    if (!query.value) return props.options;
    return props.options.filter((option) => {
      if (option.children) {
        const children = option.children.filter((child: any) => {
          return child[props.by].toLowerCase().includes(query.value.toLowerCase());
        });
        return children.length;
      }
      // @ts-ignore
      return option[props.by].toLowerCase().includes(query.value.toLowerCase());
    });
  });

  onMounted(() => {
    comboBoxInput.value?.el?.focus();
  });
</script>
