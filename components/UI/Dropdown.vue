<template>
  <HMenu v-slot="{ open: innerOpen }" ref="parent" as="div" class="relative inline-flex">
    <Float :offset="8" :placement="placement" :show="innerOpen" transition-name="dropdown">
      <HMenuButton
        class="inline-flex"
        @mouseover="hover && open()"
        @mouseleave="hover && close()"
        @click="show = !show"
      >
        <slot></slot>
      </HMenuButton>

      <HMenuItems
        @mouseover="hover && open()"
        static
        class="z-10 rounded-md border bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border"
        :class="[width]"
      >
        <slot name="header"></slot>
        <UIDropdownItem :width="width" :items="items" @close="close()" />
        <slot name="footer"></slot>
      </HMenuItems>
    </Float>
  </HMenu>
</template>

<script setup lang="ts">
  import { Float, type FloatProps } from "@headlessui-float/vue";

  const props = withDefaults(
    defineProps<{
      openDelay?: number;
      closeDelay?: number;
      hover?: boolean;
      items?: any[];
      width?: string;
      placement?: FloatProps["placement"];
    }>(),
    {
      openDelay: 50,
      closeDelay: 250,
      items: () => [],
      width: "w-56",
      placement: "bottom",
    }
  );

  const { show, open, close } = useHoverMenu(toValue(props.closeDelay), toValue(props.openDelay));

  const parent = ref(null) as Ref<HTMLElement | null>;
  onClickOutside(parent, () => {
    close();
  });
</script>

<style scoped>
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 200ms ease-in-out;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
</style>
