<template>
  <div :class="cn('flex gap-3', !hasDescription && 'items-center')">
    <input
      :id="inputId"
      :class="cn(variants({ size, type }))"
      type="checkbox"
      :name="name"
      :value="value"
      v-model="isChecked"
      :checked="checked"
      v-bind="$attrs"
    />
    <div v-if="hasLabel || hasDescription" class="flex flex-col gap-px">
      <slot name="label">
        <label
          :class="cn('cursor-pointer font-medium leading-none', size === 'sm' && 'text-sm')"
          :for="inputId"
          v-if="label"
          >{{ label }}</label
        >
      </slot>
      <slot name="description">
        <p class="text-sm text-muted-foreground" v-if="description">{{ description }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva(
    "form-checkbox cursor-pointer rounded-md bg-transparent transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
    {
      variants: {
        type: {
          muted: "border-input text-gray-800 focus:ring-muted",
          primary: "border-primary/50 text-primary dark:text-border focus:ring-primary/30",
          success: "border-success/50 text-success focus:ring-success/30",
          error: "border-destructive/50 text-destructive focus:ring-destructive/30",
          warning: "border-warning/50 text-warning focus:ring-warning/30",
          info: "border-info/50 text-info focus:ring-info/30",
        },
        size: {
          sm: "h-4 w-4 rounded",
          md: "h-[20px] w-[20px]",
          lg: "h-[26px] w-[26px]",
        },
      },
      defaultVariants: {
        size: "md",
        type: "muted",
      },
    }
  );

  type Props = VariantProps<typeof variants>;

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(
    defineProps<{
      /**
       * The value of the checkbox
       */
      value?: any;
      /**
       * v-model binding
       */
      modelValue?: any;
      /**
       * The name of the checkbox
       */
      name?: string;
      /**
       * The label of the checkbox
       */
      label?: string;
      /**
       * The description of the checkbox
       */
      description?: string;
      /**
       * The size of the checkbox
       */
      size?: Props["size"];
      /**
       * The type of the checkbox
       */
      type?: Props["type"];
      /**
       * The id of the checkbox
       */
      id?: any;
      /**
       * Checked state of the checkbox
       */
      checked?: boolean;
    }>(),
    { size: "md", type: "muted" }
  );

  const slots = useSlots();

  // Get the ID for the input element
  const inputId = computed(
    () => props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`
  );

  // check if a label or description is provided
  const hasLabel = computed(() => props.label || slots.label);
  const hasDescription = computed(() => props.description || slots.description);

  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const isChecked = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
</script>
