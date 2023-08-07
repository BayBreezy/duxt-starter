<template>
  <HRadioGroup
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <HRadioGroupLabel class="sr-only">{{ label }}</HRadioGroupLabel>
    <slot />
  </HRadioGroup>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label?: string;
    modelValue?: any;
  }>();
</script>
