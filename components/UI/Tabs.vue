<template>
  <HTabGroup v-bind="($attrs, $props)" v-slot="{ selectedIndex }" @change="emits('change', $event)">
    <HTabList>
      <slot name="tab" :selectedIndex="selectedIndex"></slot>
    </HTabList>
    <HTabPanels v-slot="{ selectedIndex }">
      <slot name="content" :selectedIndex="selectedIndex"></slot>
    </HTabPanels>
  </HTabGroup>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * The element to render as.
       * @default div
       */
      as?: string;
      /**
       * The default selected index
       * @default 0
       */
      defaultIndex?: number;
      /**
       * The selected index if using as controlled component
       * @default null
       */
      selectedIndex?: number;
      /**
       * Whether the tablist should be vertical
       * @default false
       */
      vertical?: boolean;
      /**
       * Whether the tabpanel should be manually viewed when cycling through the tabs with keyboard.
       * Users would have to press Enter or Space to vie data if this is set to true
       * @default false
       */
      manual?: boolean;
    }>(),
    {
      as: "div",
      defaultIndex: 0,
      vertical: false,
      manual: false,
    }
  );
  const emits = defineEmits<{
    (event: "change", index: number): void;
  }>();
</script>
