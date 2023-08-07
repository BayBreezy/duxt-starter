<template>
  <label
    :for="props.for"
    :class="cn('inline-block cursor-pointer text-sm font-medium', props.class)"
  >
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
  const props = defineProps<{
    /**
     *  The id of the input element that the label is bound to.
     */
    for?: string;
    /**
     * The class of the label element.
     */
    class?: any;
  }>();
</script>
