<template>
  <HTransitionRoot as="div" appear :show="isOpen">
    <HDialog as="div" class="relative z-50" @close="!forceClose && (isOpen = false)">
      <HTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        leave-to="opacity-0"
        leave="duration-200 ease-in"
      >
        <div :class="overlayStyle" aria-hidden="true"></div>
      </HTransitionChild>

      <!-- Make container scrollable -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center">
          <HTransitionChild as="template" v-bind="transitionClass">
            <HDialogPanel>
              <slot></slot>
            </HDialogPanel>
          </HTransitionChild>
        </div>
      </div>
    </HDialog>
  </HTransitionRoot>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * Control the state of the modal
       */
      modelValue?: boolean;
      /**
       * Styles to be applied ot overlay
       */
      overlayStyle?: string;
      /**
       * Disable closing with ESC key & outsideclick
       */
      forceClose?: boolean;
      /**
       * Transition styles
       */
      transition?: {
        appear?: boolean;
        enter?: string;
        enterFrom?: string;
        enterTo?: string;
        entered?: string;
        leave?: string;
        leaveFrom?: string;
        leaveTo?: string;
      };
    }>(),
    {
      overlayStyle: "fixed inset-0 bg-background/50 backdrop-blur",
      transition: () => ({}),
    }
  );

  const transitionClass = computed(() => {
    return {
      appear: true,
      enter: "duration-300 ease-out",
      enterFrom: "opacity-0 scale-75",
      leaveTo: "opacity-0 scale-95",
      leave: "duration-200 ease-in",
      ...props.transition,
    };
  });

  const emits = defineEmits(["update:modelValue"]);

  const isOpen = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits("update:modelValue", value);
    },
  });
</script>
