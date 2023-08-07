<template>
  <VueSlider v-bind="props" :id="inputId" v-model="localModel" />
</template>

<script setup lang="ts">
  import VueSlider from "@vueform/slider";

  interface Props {
    modelValue?: any;
    value?: any;
    id?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    orientation?: "horizontal" | "vertical";
    direction?: "ltr" | "rtl";
    tooltips?: boolean;
    options?: object;
    merge?: number;
    format?: any;
    classes?: object;
    showTooltip?: "always" | "focus" | "drag";
    tooltipPosition?: null | "top" | "bottom" | "left" | "right";
    lazy?: boolean;
    ariaLabelledby?: string;
    aria?: object;
  }

  const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 100,
    step: 1,
    orientation: "horizontal",
    direction: "ltr",
    tooltips: true,
    options: () => ({}),
    merge: -1,
    classes: () => ({}),
    showTooltip: "focus",
    lazy: true,
    aria: () => ({}),
    disabled: false,
  });

  const emit = defineEmits([
    "input",
    "update:modelValue",
    "start",
    "slide",
    "drag",
    "update",
    "change",
    "set",
    "end",
  ]);

  const localModel = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emit("update:modelValue", v);
    },
  });

  // Generate the ID
  const inputId = computed(
    () => props.id || `slider-${Math.random().toString(36).substring(2, 9)}`
  );
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
  :root {
    --slider-bg: theme("colors.input");
    --slider-connect-bg: theme("colors.primary.DEFAULT");
    --slider-connect-bg-disabled: theme("colors.muted.foreground / 50%");
    --slider-height: 7px;
    --slider-vertical-height: 300px;
    --slider-radius: 9999px;

    --slider-handle-bg: theme("colors.primary.DEFAULT");
    --slider-handle-border: 2;
    --slider-handle-width: 16px;
    --slider-handle-height: 16px;
    --slider-handle-radius: 9999px;
    --slider-handle-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
    --slider-handle-shadow-active: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.42);
    --slider-handle-ring-width: 4px;
    --slider-handle-ring-color: theme("colors.input");

    --slider-tooltip-font-size: 0.875rem;
    --slider-tooltip-line-height: 1.25rem;
    --slider-tooltip-font-weight: 500;
    --slider-tooltip-min-width: 25px;
    --slider-tooltip-bg: theme("colors.primary.DEFAULT");
    --slider-tooltip-bg-disabled: theme("colors.muted.foreground / 80%");
    --slider-tooltip-color: theme("colors.primary.foreground");
    --slider-tooltip-radius: 4px;
    --slider-tooltip-py: 2px;
    --slider-tooltip-px: 6px;
    --slider-tooltip-arrow-size: 5px;
    --slider-tooltip-distance: 6px;
  }
</style>
