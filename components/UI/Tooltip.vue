<template>
  <HPopover ref="parent" @mouseleave="close()">
    <Float
      :arrow="arrow"
      :offset="offset"
      flip
      shift
      :placement="placement"
      :show="show"
      transition-name="popover"
    >
      <HPopoverButton as="div" @mouseover="open()">
        <slot></slot>
      </HPopoverButton>

      <HPopoverPanel
        class="rounded-md border bg-popover text-popover-foreground"
        @mouseover="open()"
        static
      >
        <FloatArrow v-if="arrow" class="absolute h-5 w-5 rotate-45 border bg-popover" />
        <slot name="content">
          <div class="relative w-full max-w-xs rounded-md bg-popover p-2 text-sm">
            <p v-html="content"></p>
          </div>
        </slot>
      </HPopoverPanel>
    </Float>
  </HPopover>
</template>

<script setup lang="ts">
  import { Float, type FloatProps, FloatArrow } from "@headlessui-float/vue";
  const props = withDefaults(
    defineProps<{
      openDelay?: number;
      closeDelay?: number;
      placement?: FloatProps["placement"];
      arrow?: FloatProps["arrow"];
      offset?: FloatProps["offset"];
      content?: string;
    }>(),
    {
      openDelay: 50,
      closeDelay: 250,
      placement: "bottom",
      offset: 10,
    }
  );

  const { show, open, close } = useHoverMenu(toValue(props.closeDelay), toValue(props.openDelay));

  const parent = ref(null) as Ref<HTMLElement | null>;
  onClickOutside(parent, () => {
    close();
  });
</script>

<style scoped>
  .popover-enter-active,
  .popover-leave-active {
    transition: all 200ms ease-in-out;
  }

  .popover-enter-from,
  .popover-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
