<template>
  <ClientOnly>
    <ContextMenu v-model:show="show" :options="localOptions">
      <template
        #itemRender="{ disabled, label, icon, showRightArrow, onClick, onMouseEnter, shortcut }"
      >
        <button
          class="flex w-full cursor-pointer items-center justify-between rounded px-2 py-1.5 text-left text-sm hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          @click="onClick"
          :disabled="disabled"
          @mouseenter="onMouseEnter"
        >
          <div class="flex grow items-center gap-3">
            <Icon v-if="icon" :name="icon" />
            <span>{{ label }}</span>
          </div>
          <span v-if="showRightArrow"
            ><Icon name="heroicons:chevron-right" class="h-4 w-4 text-muted-foreground"
          /></span>
          <span v-else-if="shortcut" class="text-xs text-muted-foreground">{{ shortcut }}</span>
        </button>
      </template>

      <template v-for="(item, i) in items" :key="i">
        <ContextMenuItem v-if="!item.children" v-bind="item as any" />
        <ContextMenuGroup v-else-if="item.children" v-bind="item as any">
          <ContextMenuItem
            v-for="(child, k) in item.children"
            :key="`child-${k}`"
            v-bind="child as any"
          />
        </ContextMenuGroup>
        <ContextMenuSeparator class="!bg-popover !p-1.5 after:!bg-border" v-if="item.divided" />
      </template>
    </ContextMenu>
  </ClientOnly>
</template>

<script setup lang="ts">
  import {
    ContextMenu,
    ContextMenuGroup,
    ContextMenuSeparator,
    ContextMenuItem,
    type MenuOptions,
    type MenuItem,
  } from "@imengyu/vue3-context-menu";

  const { x, y } = useMouse();
  const { y: windowY } = useWindowScroll();

  const props = withDefaults(
    defineProps<{
      modelValue?: boolean;
      config?: Omit<MenuOptions, "x" | "y" | "items">;
      items?: MenuItem[];
    }>(),
    {
      modelValue: false,
    }
  );

  const localOptions = computed(() => {
    const top = unref(y) - unref(windowY);
    const left = unref(x);
    return {
      zIndex: 1000,
      x: left,
      y: top,
      closeWhenScroll: false,
      ...props.config,
      customClass: "my-context-menu",
    };
  });
  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const show = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
</script>
<style src="@imengyu/vue3-context-menu/lib/vue3-context-menu.css"></style>

<style>
  .my-context-menu {
    @apply !min-w-[250px] !rounded-md border !bg-popover p-1 text-popover-foreground !shadow transition-opacity duration-200;
  }
</style>
