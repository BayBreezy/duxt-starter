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
      <select
        ref="selectRef"
        :name="name"
        :required="required"
        v-bind="$attrs"
        :disabled="disabled"
        :id="inputId"
        :placeholder="placeholder"
        :class="cn(variants({ class: props.class }), icon && 'pl-9')"
        v-model="localValue"
        @input="
          emit('input', ($event.target as any).value);
          handleChange($event);
        "
      >
        <option value="" disabled class="bg-background">
          {{ placeholder }}
        </option>
        <option
          v-for="(o, i) in localOptions"
          :key="i"
          :value="returnObject && !optionsIsPrimitive ? o : o[valueProp]"
          class="bg-background"
        >
          {{ o[labelProp] }}
        </option>
      </select>
      <slot :errorMessage="errorMessage" :value="localValue" name="icon">
        <div v-if="icon" class="absolute inset-y-0 left-3 flex items-center justify-center">
          <Icon :name="icon" class="text-muted-foreground/70" size="18" />
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
    "form-select block px-3 py-2 h-10 w-full border-input sm:text-sm transition placeholder:text-muted-foreground focus:outline-none bg-transparent rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-ring focus:border-input disabled:cursor-not-allowed disabled:opacity-60"
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
       * The model value for the input
       */
      modelValue?: any;
      /**
       * Custom class to pas to the input
       */
      class?: any;
      /**
       * The options for the select
       */
      options?: any[];
      /**
       * The label property for the options
       */
      labelProp?: string;
      /**
       * The value property for the options
       */
      valueProp?: string;
      /**
       * Whether the input should autofocus
       */
      autofocus?: boolean;
      /**
       * Whether the input should return the object or the value
       */
      returnObject?: boolean;
      /**
       * Rules for the input
       */
      rules?: any;
    }>(),
    { placeholder: "Select an option", options: () => [], labelProp: "label", valueProp: "id" }
  );

  const selectRef = ref<HTMLSelectElement | null>(null);

  // Focus the input on mount
  onMounted(() => {
    if (props.autofocus) {
      setTimeout(() => {
        selectRef.value?.focus();
      }, 100);
    }
  });

  // Get the id of the input from the label or name
  const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);

  const emit = defineEmits<{
    "update:modelValue": [any];
    input: [any];
  }>();

  const {
    value: localValue,
    errorMessage,
    handleChange,
  } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    label: props.label,
    syncVModel: true,
  });

  const optionsIsPrimitive = computed(() => {
    return props.options.every(
      (o) => typeof o === "string" || typeof o === "number" || typeof o === "boolean"
    );
  });

  const localOptions = computed(() => {
    if (optionsIsPrimitive.value) {
      return props.options.map((o) => ({ [props.labelProp]: o, [props.valueProp]: o }));
    }
    return props.options.map((o) => ({
      ...o,
      [props.labelProp]: o[props.labelProp],
      [props.valueProp]: o[props.valueProp],
    }));
  });
</script>
