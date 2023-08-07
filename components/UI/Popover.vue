<template>
  <HPopover ref="parent" @mouseleave="hover && close()">
    <Float :offset="10" flip shift :placement="placement" :show="show" transition-name="popover">
      <HPopoverButton @click="show = !show" as="div" @mouseover="hover && open()">
        <slot :close="close" :open="open" :show="show"></slot>
      </HPopoverButton>
      <HPopoverPanel @mouseover="hover && open()" static>
        <slot name="content" :close="close" :open="open" :show="show"></slot>
      </HPopoverPanel>
    </Float>
  </HPopover>
</template>

<script setup lang="ts">
  import { Float, type FloatProps } from "@headlessui-float/vue";
  const props = withDefaults(
    defineProps<{
      openDelay?: number;
      closeDelay?: number;
      hover?: boolean;
      placement?: FloatProps["placement"];
    }>(),
    {
      openDelay: 50,
      closeDelay: 250,
      placement: "bottom",
    }
  );

  const { show, open, close } = useHoverMenu(toValue(props.closeDelay), toValue(props.openDelay));

  const parent = ref(null) as Ref<HTMLElement | null>;
  onClickOutside(parent, () => {
    close();
  });
  defineExpose({ close, open });
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
