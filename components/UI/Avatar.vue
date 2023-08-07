<template>
  <div
    :class="
      cn(
        variants({ size, shape, class: props.class }),
        'relative inline-flex items-center justify-center'
      )
    "
  >
    <!-- Display image is src was passed -->
    <img
      :class="cn(variants({ shape }), 'inline-block h-full w-full object-cover')"
      v-if="src && !error"
      :src="src"
      :alt="src || alt"
      :onerror="() => (error = true)"
    />
    <slot v-else-if="icon" name="icon">
      <Icon :name="icon" :size="getIconSize" />
    </slot>
    <!-- Display initials if src was not passed -->
    <span v-else>{{ createInitials }}</span>
    <slot name="chip">
      <span v-if="chip" :class="cn(chipClass)"></span>
    </slot>
    <slot :props="props" />
  </div>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva("font-medium ring-1 ring-muted", {
    variants: {
      size: {
        xs: "h-4 w-4 text-xs",
        sm: "h-6 w-6 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-sm",
        xl: "h-14 w-14",
        "2xl": "h-16 w-16",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  });

  type Props = VariantProps<typeof variants>;

  const props = withDefaults(
    defineProps<{
      /**
       * The size of the avatar
       * @default md
       */
      size?: Props["size"];
      /**
       * The shape of the avatar
       * @default circle
       */
      shape?: Props["shape"];
      /**
       * The image source
       */
      src?: string;
      /**
       * The alt text for the image
       */
      alt?: string;
      /**
       * The initials to display if no image is passed
       */
      initials?: string;
      /**
       * The icon to display if no image is passed
       */
      icon?: string;
      /**
       * The class for the chip
       */
      chipClass?: string;
      /**
       * Whether to display the chip
       * @default false
       */
      chip?: boolean;
      /**
       * Custom class to apply
       */
      class?: any;
    }>(),
    {
      chipClass:
        "absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background",
    }
  );

  defineSlots<{
    default(props: any): void;
    icon(): any;
    chip(): any;
  }>();

  // Create a ref for the error state
  const error = ref(false);

  // Create initials from the alt/initials prop
  const createInitials = computed(() => {
    return useUpperCase(
      (props.initials || props.alt || "")
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 2)
    );
  });
  // Get the size of the icon based on the size prop
  const getIconSize = computed(() => {
    switch (props.size) {
      case "xs":
        return "14";
      case "sm":
        return "16";
      case "md":
        return "20";
      case "lg":
        return "24";
      case "xl":
        return "28";
      case "2xl":
        return "32";
    }
  });
</script>
