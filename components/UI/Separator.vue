<template>
  <div
    :role="role"
    :class="
      cn(
        orientation == 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        'block bg-border',
        props.class
      )
    "
  ></div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * The orientation of the separator.
       */
      orientation?: "horizontal" | "vertical";
      /**
       * The role of the separator.
       */
      role?: "separator" | "presentation";
      /**
       * The class of the separator.
       */
      class?: any;
    }>(),
    {
      orientation: "horizontal",
      role: "separator",
    }
  );
</script>
