<template>
  <HTabPanel
    v-bind="($attrs, $props)"
    class="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    v-slot="{ selected }"
  >
    <slot :selected="selected"></slot>
  </HTabPanel>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      /**
       * The component to render as.
       * @default div
       */
      as?: string;
      /**
       * Whether the element should ignore the selected index.
       * @default false
       */
      static?: boolean;
      /**
       * Whether the tabpanel should be unmounted when not visible.
       * @default true
       */
      unmount?: boolean;
    }>(),
    {
      as: "div",
      static: false,
      unmount: true,
    }
  );
</script>
