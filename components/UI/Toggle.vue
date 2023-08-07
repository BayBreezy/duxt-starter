<template>
  <HSwitchGroup as="div" :class="cn('flex gap-3', !hasDescription && 'items-center')">
    <HSwitch
      v-model="active"
      :as="as"
      :name="name"
      :class="cn(variants({ size, color }), !active && 'bg-input')"
    >
      <span v-if="srText" class="sr-only">{{ srText }}</span>
      <span
        :class="
          cn(
            knobSize,
            active && knobTransalte,
            !active && 'translate-x-px bg-background',
            active && color && color === 'primary' && 'bg-primary-foreground dark:bg-background'
          )
        "
        class="pointer-events-none m-px inline-flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition"
      >
        <span class="flex shrink-0 items-center justify-center" v-if="onIcon && active">
          <slot name="onIcon">
            <Icon size="12" :name="onIcon" />
          </slot>
        </span>
        <span class="flex shrink-0 items-center justify-center" v-else-if="offIcon && !active">
          <slot name="offIcon">
            <Icon size="12" :name="offIcon" />
          </slot>
        </span>
      </span>
    </HSwitch>
    <div v-if="hasLabel || hasDescription" class="flex flex-col">
      <HSwitchLabel v-if="label" :class="cn(labelSize)" class="cursor-pointer font-medium">
        <slot name="label">{{ label }}</slot>
      </HSwitchLabel>
      <HSwitchDescription class="text-sm text-muted-foreground" v-if="description">
        <slot name="description">{{ description }}</slot>
      </HSwitchDescription>
    </div>
  </HSwitchGroup>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva(
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background",
    {
      variants: {
        color: {
          primary: "bg-primary focus:ring-primary/30",
          success: "bg-success focus:ring-success/30",
          error: "bg-destructive focus:ring-destructive/30",
          warning: "bg-warning focus:ring-warning/30",
          info: "bg-info focus:ring-info/30",
        },
        size: {
          sm: "h-5 w-9",
          md: "h-6 w-11",
          lg: "h-7 w-14",
        },
      },
    }
  );

  type Props = VariantProps<typeof variants>;

  const props = withDefaults(
    defineProps<{
      /**
       * The v-model binding for the switch.
       */
      modelValue?: boolean;
      /**
       * The text to be read by screen readers.
       */
      srText?: string;
      /**
       * The HTML tag to render the switch as.
       */
      as?: string;
      /**
       * The name of the switch for forms
       */
      name?: string;
      /**
       * The icon to show when the switch is on.
       */
      onIcon?: string;
      /**
       * The icon to show when the switch is off.
       */
      offIcon?: string;
      /**
       * The size of the switch.
       */
      size?: Props["size"];
      /**
       * The color of the switch.
       */
      color?: Props["color"];
      /**
       * The label for the switch.
       */
      label?: string;
      /**
       * The description for the switch.
       */
      description?: string;
    }>(),
    {
      as: "button",
      size: "md",
      color: "primary",
    }
  );

  const knobSize = computed(() => {
    switch (props.size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-5 h-5";
      case "lg":
        return "w-6 h-6";
    }
  });
  const knobTransalte = computed(() => {
    switch (props.size) {
      case "sm":
        return "translate-x-4";
      case "md":
        return "translate-x-5";
      case "lg":
        return "translate-x-7";
    }
  });

  const labelSize = computed(() => {
    switch (props.size) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-[15px]";
      case "lg":
        return "text-lg";
    }
  });

  const slots = useSlots();
  // check if a label or description is provided
  const hasLabel = computed(() => props.label || slots.label);
  const hasDescription = computed(() => props.description || slots.description);

  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const active = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emit("update:modelValue", v);
    },
  });
</script>
