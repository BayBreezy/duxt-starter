<template>
  <HDisclosure class="w-full" v-slot="{ open, close }" :as="parentTag">
    <HDisclosureButton :as="titleTag">
      <slot :open="open" :close="close" name="button">
        <button :class="cn(variants({ buttonStyle, class: props.class }))">
          <slot :open="open" :close="close" name="title">
            <span>
              {{ title }}
            </span>
          </slot>
          <slot :open="open" :close="close" name="icon">
            <div>
              <Icon
                :class="[open && 'rotate-180 opacity-100', 'opacity-70 transition duration-200']"
                :name="icon"
              />
            </div>
          </slot>
        </button>
      </slot>
    </HDisclosureButton>
    <TransitionExpand>
      <HDisclosurePanel :unmount="unmount" :as="panelTag" v-slot="{ open, close }">
        <slot :open="open" :close="close"></slot>
      </HDisclosurePanel>
    </TransitionExpand>
  </HDisclosure>
</template>

<script setup lang="ts">
  import { cva, type VariantProps } from "class-variance-authority";

  const variants = cva("inline-flex w-full items-center justify-between py-4 font-medium px-2", {
    variants: {
      buttonStyle: {
        muted: "mb-1 rounded-md bg-muted",
        outline: "mb-1 rounded-md border",
        shadcn: " hover:underline",
      },
    },
    defaultVariants: {
      buttonStyle: "shadcn",
    },
  });
  type CVAProps = VariantProps<typeof variants>;
  const props = withDefaults(
    defineProps<{
      /** Tag added to the parent element
       * @default "div"
       */
      parentTag?: string;
      /**
       * Tag added to the panel element
       * @default "div"
       */
      panelTag?: string;
      /**
       * Tag added to the title element
       * @default "template"
       */
      titleTag?: string;
      /**
       * Whether the panel is open or not
       * @default false
       */
      defaultOpen?: boolean;
      /**
       * Whether to unmount the panel when closed
       * @default true
       */
      unmount?: boolean;
      /**
       * The title of the disclosure button
       * @default "Expand me"
       */
      title?: string;
      /**
       * The icon of the disclosure button
       * @default "heroicons:chevron-down"
       */
      icon?: string;
      /**
       * The style of the disclosure button
       * @default "shadcn"
       */
      buttonStyle?: CVAProps["buttonStyle"];
      /**
       * Custom class to apply
       */
      class?: any;
    }>(),
    {
      parentTag: "div",
      panelTag: "div",
      titleTag: "template",
      defaultOpen: false,
      unmount: true,
      title: "Expand me",
      icon: "heroicons:chevron-down",
    }
  );

  interface Slot {
    /**
     * Whether the panel is open or not
     */
    open: boolean;
    /**
     * Closes the disclosure and refocuses DisclosureButton.
     * Optionally pass in a ref or HTMLElement to focus that element instead.
     */
    close: (ref?: Ref | HTMLElement) => void;
  }
  defineSlots<{
    button(props: Slot): any;
    title(props: Slot): any;
    icon(props: Slot): any;
    default(props: Slot): any;
  }>;
</script>
