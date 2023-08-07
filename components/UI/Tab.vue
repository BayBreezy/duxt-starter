<template>
  <HTab
    v-bind="($attrs, $props)"
    :disabled="disabled"
    :class="cn(variants({ type, class: props.class }))"
    v-slot="{ selected }"
  >
    <slot :selected="selected" />
  </HTab>
</template>
<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva(
    "inline-flex items-center justify-center gap-2 text-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
    {
      variants: {
        type: {
          underline:
            "z-[1] whitespace-nowrap border-b-2 border-b-transparent px-4 py-3 text-foreground/70 transition focus:outline-none data-[headlessui-state=selected]:border-primary data-[headlessui-state=selected]:text-primary hover:text-primary hover:bg-muted",
          fill: "z-[1] whitespace-nowrap rounded-md px-4 py-2 text-muted-foreground transition hover:text-foreground data-[headlessui-state=selected]:bg-background data-[headlessui-state=selected]:text-foreground data-[headlessui-state=selected]:shadow-sm font-medium",
        },
      },
      defaultVariants: {
        type: "underline",
      },
    }
  );
  type Props = VariantProps<typeof variants>;

  const props = withDefaults(
    defineProps<{
      /**
       * The component to render as.
       * @default button
       */
      as?: string;
      /**
       * Whether the tab is disabled.
       * @default false
       */
      disabled?: boolean;
      /**
       * The type of tab to render.
       * @default underline
       */
      type?: Props["type"];
      /**
       * The class to apply to the tab.
       */
      class?: any;
    }>(),
    { as: "button", disabled: false }
  );
</script>
