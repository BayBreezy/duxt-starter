<template>
  <div v-for="(item, i) in items">
    <button
      :disabled="item.disabled"
      @click="item.click?.()"
      :class="cn(variants({ class: props.class }))"
      v-if="!item.children"
    >
      <Icon v-if="item.icon" :name="item.icon" class="h-4 w-4 text-muted-foreground" />
      <span>{{ item.title }}</span>
    </button>

    <HDisclosure :default-open="item.open" v-slot="{ open }" v-if="item.children">
      <HDisclosureButton :disabled="item.disabled" :class="cn(variants({ class: props.class }))">
        <Icon v-if="item.icon && !open" :name="item.icon" class="h-4 w-4 text-muted-foreground" />
        <Icon v-else :name="item.openIcon || item.icon" class="h-4 w-4 text-muted-foreground" />
        <span>{{ item.title }}</span>
      </HDisclosureButton>
      <TransitionExpand>
        <HDisclosurePanel class="ml-2 pl-3">
          <UITreeview :items="item.children" />
        </HDisclosurePanel>
      </TransitionExpand>
    </HDisclosure>
  </div>
</template>

<script setup lang="ts">
  import { cva } from "class-variance-authority";

  const variants = cva(
    "flex w-full text-sm items-center gap-2.5 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2 focus-visible:rounded focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed rounded p-1.5 hover:bg-muted"
  );

  const props = defineProps<{
    items?: any[];
    class?: any;
  }>();
</script>
