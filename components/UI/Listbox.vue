<template>
  <HListbox
    as="div"
    class="w-full"
    :multiple="multiple"
    v-model="localValue"
    :disabled="disabled"
    :name="name"
  >
    <HListboxLabel
      :as="Label"
      :for="inputId"
      class="mb-1.5"
      :class="[disabled ? 'text-muted-foreground' : '', errorMessage ? 'text-destructive' : '']"
      v-if="label"
    >
      <slot name="label">
        {{ label }} <span v-if="required" class="text-destructive">*</span>
      </slot>
    </HListboxLabel>
    <Float
      transition-name="slide"
      as="div"
      class="relative w-full"
      placement="bottom"
      :offset="8"
      flip
      floatingAs="template"
    >
      <div class="relative w-full">
        <HListboxButton
          class="w-full justify-start text-left hover:bg-background"
          :class="[icon && 'pl-9', trailingIcon && 'pr-9']"
          variant="outline"
          :id="inputId"
          :as="Button"
        >
          <slot name="selected" :selectedOption="selectedOption" :value="localValue">
            <p class="truncate text-ellipsis">
              {{ selectedOption }}
            </p>
          </slot>
        </HListboxButton>
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

      <HListboxOptions
        class="max-h-[250px] w-full overflow-y-auto rounded-md border bg-background py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <template v-for="(o, i) in localOptions" :key="i">
          <HListboxOption
            v-slot="{ selected, active }"
            :value="returnObject && !optionsIsPrimitive ? o : o[valueProp]"
          >
            <slot name="option" :option="o" :index="i" :active="active" :selected="selected">
              <li
                :class="[active && 'bg-muted', selected && 'bg-primary text-primary-foreground']"
                class="px-2 py-1.5 text-sm"
              >
                {{ o[props.labelProp] }}
              </li>
            </slot>
          </HListboxOption>
        </template>
      </HListboxOptions>
    </Float>
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
  </HListbox>
</template>

<script setup lang="ts">
  import { Float } from "@headlessui-float/vue";
  import Button from "@/components/UI/Button.vue";
  import Label from "@/components/UI/Label.vue";

  const props = withDefaults(
    defineProps<{
      label?: string;
      name?: string;
      placeholder?: string;
      id?: any;
      disabled?: boolean;
      multiple?: boolean;
      required?: boolean;
      hint?: string;
      icon?: string;
      trailingIcon?: string;
      options?: any[];
      labelProp?: string;
      valueProp?: string;
      returnObject?: boolean;
      modelValue?: any;
      rules?: any;
    }>(),
    {
      placeholder: "Select an option",
      options: () => [],
      labelProp: "label",
      valueProp: "id",
      trailingIcon: "heroicons:chevron-down",
    }
  );

  // Get the id of the input from the label or name
  const inputId = computed(() => props.id || `input-${Math.random().toString(36).substring(2, 9)}`);

  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const {
    errorMessage,
    handleChange,
    value: localValue,
  } = useField(() => props.name || inputId.value, props.rules, {
    initialValue: props.modelValue,
    syncVModel: true,
    label: props.label,
  });

  const optionsIsPrimitive = computed(() => {
    return props.options?.every(
      (o) => typeof o === "string" || typeof o === "number" || typeof o === "boolean"
    );
  });

  const localOptions = computed(() => {
    if (optionsIsPrimitive.value) {
      return props.options?.map((o) => ({ [props.labelProp]: o, [props.valueProp]: o }));
    }
    return props.options.map((o) => ({
      ...o,
      [props.labelProp]: o[props.labelProp],
      [props.valueProp]: o[props.valueProp],
    }));
  });

  const selectedOption = computed(() => {
    if (!localValue.value) return props.placeholder;
    if (props.multiple) {
      // If not an array, return placeholder
      if (!Array.isArray(localValue.value)) return props.placeholder;
      // If empty array, return placeholder
      if (!localValue.value.length) return props.placeholder;
      // If returnObject is true
      if (props.returnObject) {
        return localValue.value
          .map((v: any) => {
            return (
              localOptions.value.find((o) => o[props.valueProp] === v[props.valueProp])?.[
                props.labelProp
              ] || props.placeholder
            );
          })
          .join(", ");
      }
      return localValue.value
        .map((v: any) => {
          return (
            localOptions.value.find((o) => o[props.valueProp] === v)?.[props.labelProp] ||
            props.placeholder
          );
        })
        .join(", ");
    }
    if (props.returnObject) {
      return (
        localOptions.value.find((o) => o[props.valueProp] === localValue.value[props.valueProp])?.[
          props.labelProp
        ] || props.placeholder
      );
    }
    return (
      localOptions.value.find((o) => o[props.valueProp] === localValue.value)?.[props.labelProp] ||
      props.placeholder
    );
  });
</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.2s ease-out;
  }

  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
  }
</style>
