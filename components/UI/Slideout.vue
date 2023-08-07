<template>
  <HTransitionRoot appear :show="isOpen" as="template">
    <HDialog as="div" @close="closeOnOutsideClick && close()" :class="cn(parentWrapper)">
      <HTransitionChild
        :appear="appear"
        v-if="overlay"
        as="template"
        enter="duration-300 ease-out"
        leave="duration-200 ease-in"
        enter-from="opacity-0"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-background/60 backdrop-blur" />
      </HTransitionChild>

      <div>
        <HTransitionChild
          as="template"
          v-bind="transitionClass"
          enter="transform transition ease-in-out duration-300"
          leave="transform transition ease-in-out duration-200"
        >
          <HDialogPanel
            :class="
              cn(
                'relative flex w-full flex-1 flex-col bg-background focus:outline-none',
                $attrs.class
              )
            "
          >
            <slot :close="close" />
          </HDialogPanel>
        </HTransitionChild>
      </div>
    </HDialog>
  </HTransitionRoot>
</template>

<script setup lang="ts">
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(
    defineProps<{
      /**
       * The side of the screen the slideout will appear from.
       */
      side?: "left" | "right" | "top" | "bottom";
      /**
       * Whether the transition should run on initial mount.
       * @default true
       */
      appear?: boolean;
      /**
       * Control the state of the slideout
       */
      modelValue?: boolean;
      /**
       * Whether to show the overlay
       * @default true
       */
      overlay?: boolean;
      /**
       * Whether to close the slideout when clicking outside of it
       * @default true
       */
      closeOnOutsideClick?: boolean;
    }>(),
    {
      appear: true,
      overlay: true,
      closeOnOutsideClick: true,
      side: "left",
    }
  );

  const emits = defineEmits(["update:modelValue", "close"]);
  // Internal state of the slideout
  const isOpen = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits("update:modelValue", value);
    },
  });
  // Function used to close the slideout
  const close = () => {
    isOpen.value = false;
    emits("close");
  };
  // Transition classes based on the side the slideout is appearing from
  const transitionClass = computed(() => {
    return {
      enterFrom:
        props.side === "left"
          ? "-translate-x-full"
          : props.side === "right"
          ? "translate-x-full"
          : props.side === "top"
          ? "-translate-y-full"
          : "translate-y-full",

      leaveTo:
        props.side === "left"
          ? "-translate-x-full"
          : props.side === "right"
          ? "translate-x-full"
          : props.side === "top"
          ? "-translate-y-full"
          : "translate-y-full",
    };
  });
  // Parent wrapper classes based on the side the slideout is appearing from
  const parentWrapper = computed(() => {
    return `fixed inset-0 flex z-50 ${props.side === "right" && "justify-end"} ${
      props.side === "left" && "justify-start"
    } ${props.side === "top" && "items-start"} ${props.side === "bottom" && "items-end"}`;
  });
</script>
