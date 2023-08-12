<template>
  <div class="w-full">
    <slot :errorMessage="errorMessage" :value="localValue" name="label">
      <UILabel
        :for="inputId"
        class="mb-1.5"
        :class="[disabled ? 'text-muted-foreground' : '', errorMessage ? 'text-destructive' : '']"
        v-if="label"
        >{{ label }} <span v-if="required" class="text-destructive">*</span></UILabel
      >
    </slot>
    <div class="relative">
      <input
        :name="name"
        ref="inputRef"
        :required="required"
        v-bind="$attrs"
        :disabled="disabled"
        :id="inputId"
        :placeholder="placeholder"
        :type="type"
        :class="cn(variants({ class: props.class }), icon && 'pl-9', trailingIcon && 'pr-10')"
        v-model="localValue"
        @blur="
          emit('blur', ($event.target as any).value);
          handleBlur($event);
        "
        @change="
          emit('change', ($event.target as any).value);
          handleChange($event);
        "
        @input="
          emit('input', ($event.target as any).value);
          handleChange($event);
        "
      />
      <slot :errorMessage="errorMessage" :value="localValue" name="icon">
        <div v-if="icon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon :name="icon" class="text-muted-foreground/70" size="18" />
        </div>
      </slot>
      <slot :errorMessage="errorMessage" :value="localValue" name="trailingIcon">
        <div
          v-if="trailingIcon"
          class="absolute inset-y-0 right-3 flex items-center justify-center"
        >
          <Icon :name="trailingIcon" class="text-muted-foreground/70" size="18" />
        </div>
      </slot>
    </div>
    <slot :errorMessage="errorMessage" :value="localValue" name="hint">
      <TransitionSlide :offset="[0, -10]">
        <p class="mt-1.5 text-xs text-muted-foreground" v-if="hint && !errorMessage">
          {{ hint }}
        </p>
      </TransitionSlide>
    </slot>
    <p v-if="errorMessage" class="mt-1.5 text-xs text-destructive">
      &nbsp;
      <TransitionSlide :offset="[0, -10]">
        <span v-if="errorMessage">
          {{ errorMessage }}
        </span>
      </TransitionSlide>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { cva } from "class-variance-authority";
  const variants = cva(
    "form-input flex px-3 py-2 h-10 w-full border-input sm:text-sm transition placeholder:text-muted-foreground focus:outline-none bg-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring focus:border-input disabled:cursor-not-allowed disabled:opacity-60"
  );

  const props = withDefaults(
    defineProps<{
      /**
       * State if the value is required
       */
      required?: boolean;
      /**
       * The label for the input
       */
      label?: string;
      /**
       * The ID of the input
       */
      id?: string;
      /**
       * The name of the input
       */
      name?: string;
      /**
       * Whether the input is disabled
       */
      disabled?: boolean;
      /**
       * The placeholder for the input
       */
      placeholder?: string;
      /**
       * The hint for the input
       */
      hint?: string;
      /**
       * The icon for the input
       */
      icon?: string;
      /**
       * The trailing icon for the input
       */
      trailingIcon?: string;
      /**
       * The model value for the input
       */
      modelValue?: any;
      /**
       * The type of the input
       * @default text
       */
      type?: string;
      /**
       * Custom class to pas to the input
       */
      class?: any;
      /**
       * Whether the input should autofocus
       */
      autofocus?: boolean;
      /**
       * Rules for the input
       */
      rules?: any;
    }>(),
    { type: "text" }
  );

  // Get the id of the input from the label or name
  const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);

  const inputRef = ref<HTMLInputElement | null>(null);

  // Focus the input when autofocus is true
  onMounted(() => {
    setTimeout(() => {
      if (props.autofocus) {
        inputRef.value?.focus();
      }
    }, 100);
  });
  const emit = defineEmits<{
    "update:modelValue": [any];
    change: [any];
    blur: [any];
    input: [any];
  }>();

  const {
    value: localValue,
    errorMessage,
    handleBlur,
    handleChange,
  } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    syncVModel: true,
  });
</script>
