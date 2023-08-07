<template>
  <div v-if="shown" :class="cn(variants({ variant, class: props.class }))">
    <slot name="icon">
      <Icon class="shrink-0" :name="icon" size="20" v-if="icon" />
    </slot>
    <slot>
      <div class="flex flex-col gap-1 leading-none tracking-tight">
        <slot name="title">
          <p class="font-medium">{{ title }}</p>
        </slot>
        <slot name="message">
          <p class="text-sm opacity-80">{{ message }}</p>
        </slot>
        <slot name="footer"></slot>
      </div>
    </slot>
    <div v-if="dismissible" class="absolute right-3 top-2">
      <slot name="dismissible">
        <button @click="shown = false" class="inline-flex items-center justify-center">
          <Icon :name="closeIcon" />
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva("relative flex w-full gap-2.5 rounded-md border border-transparent p-4", {
    variants: {
      variant: {
        outline: "border-border",
        info: "border-info text-info",
        success: "border-success text-success",
        warning: "border-warning text-warning",
        destructive: "border-destructive text-destructive",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  });

  type CVAProps = VariantProps<typeof variants>;

  const props = withDefaults(
    defineProps<{
      /**
       * The variant of the badge.
       * @default outline
       */
      variant?: CVAProps["variant"];
      /**
       * Title to render
       */
      title?: string;
      /**
       * Message to render
       */
      message?: string;
      /**
       * Icon to render
       */
      icon?: string;
      /**
       * Whether the badge is shown or not.
       */
      shown?: boolean;
      /**
       * If the badge is dismissible.
       */
      dismissible?: boolean;
      /**
       * Icon used for closing alert
       */
      closeIcon?: string;
      /**
       * Custom class to apply
       */
      class?: any;
    }>(),
    {
      variant: "outline",
      shown: true,
      dismissible: false,
      closeIcon: "fluent:dismiss-24-regular",
    }
  );

  const emits = defineEmits<{
    (e: "update:shown", value: boolean): void;
  }>();

  const shown = computed({
    get() {
      return props.shown;
    },
    set(value) {
      emits("update:shown", value);
    },
  });
</script>
