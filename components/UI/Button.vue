<template>
  <component
    :is="elType"
    :to="to"
    :disabled="disabled"
    @click="onClick"
    :href="href"
    :class="cn(variants({ size, variant, class: props.class }))"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from "#vue-router";
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
          "icon-sm": "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );

  type Props = VariantProps<typeof variants>;
  const props = defineProps<{
    /** Custom class to add to the button */
    class?: any;
    /** The page the button should route to */
    to?: string | RouteLocationRaw;
    /** The URL that the button should go to */
    href?: string;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Style of the button */
    variant?: Props["variant"];
    /** Size of the button */
    size?: Props["size"];
    /** Click handler */
    onClick?: (e: MouseEvent) => void;
  }>();

  const elType = computed(() => {
    if (props.to || props.href) return resolveComponent("NuxtLink");
    return "button";
  });
</script>
