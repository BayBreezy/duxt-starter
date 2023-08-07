<template>
  <div
    class="flex w-full cursor-pointer select-none items-center justify-between gap-2.5 rounded p-1.5 px-2 text-left text-sm"
    :class="[active && 'bg-muted']"
  >
    <div class="flex grow items-center gap-2.5">
      <Icon v-if="item.icon" :name="item.icon" class="h-4 w-4 text-muted-foreground" />
      <UIAvatar v-else-if="item.avatar" :src="item.avatar" class="h-5 w-5" />
      <span>{{ item.title }}</span>
    </div>
    <span v-if="item.shortcut" class="text-xs text-muted-foreground">{{ item.shortcut }}</span>
  </div>
</template>

<script setup lang="ts">
  import { CommandOption } from "@/components/UI/Command.vue";

  const props = defineProps<{
    item: CommandOption;
    active: boolean;
    selected: boolean;
  }>();
</script>
