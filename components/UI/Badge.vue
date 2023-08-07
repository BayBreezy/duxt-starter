<template>
  <component
    :to="to"
    :class="cn(variants({ size, variant, class: props.class }))"
    :is="componentTag"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva(
    "inline-flex items-center justify-center gap-2 rounded-full border border-transparent transition",
    {
      variants: {
        size: {
          sm: "px-2.5 py-0.5 text-xs",
          md: "px-3 py-0.5 text-[13px]",
          lg: "px-3.5 py-1.5 text-sm",
        },
        variant: {
          primary: "bg-primary text-primary-foreground hover:bg-primary/80",
          "primary-outline": "border-primary bg-transparent text-primary hover:bg-primary/10",
          muted: "bg-muted text-foreground hover:bg-muted/70",
          "muted-outline": "border-border bg-transparent text-foreground hover:bg-muted",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
          "destructive-outline":
            "border-destructive/50 bg-transparent text-destructive hover:bg-destructive/10",
        },
      },
      defaultVariants: {
        size: "sm",
        variant: "primary",
      },
    }
  );

  type CVAProps = VariantProps<typeof variants>;

  const props = defineProps<{
    /**
     * The tag to use for the badge.
     */
    tag?: string;
    /**
     * The link to use for the badge.
     */
    to?: string;
    /**
     * The size of the badge.
     * @default md
     */
    size?: CVAProps["size"];
    /**
     * The variant of the badge.
     * @default primary
     */
    variant?: CVAProps["variant"];
    /**
     * Custom class to apply
     */
    class?: any;
  }>();

  // Get the type of element to render
  const componentTag = computed(() => {
    return props.tag || (props.to ? resolveComponent("NuxtLink") : "span");
  });
</script>
