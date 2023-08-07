<template>
  <div class="w-full rounded-md bg-background p-1 text-sm">
    <template v-for="(item, i) in items" :key="i">
      <hr v-if="item.divider" class="my-1.5" />
      <HMenuItem v-slot="{ active, disabled }" v-else-if="!item.children">
        <button
          @click="item.onClick?.(() => $emit('close')) ?? $emit('close')"
          :disabled="disabled"
          class="flex w-full items-center justify-between rounded px-2 py-1.5 transition"
          :class="[active && 'bg-muted']"
        >
          <div class="inline-flex w-full items-center gap-3">
            <Icon :name="item.icon" class="h-4 w-4" v-if="item.icon" />
            <UIAvatar :src="item.avatar" class="h-4 w-4" v-if="item.avatar" />
            <p class="truncate">{{ item.label }}</p>
          </div>
          <span
            v-if="item.shortcut"
            class="flex shrink-0 items-center justify-center text-xs text-muted-foreground"
          >
            <span>{{ item.shortcut }}</span>
          </span>
        </button>
      </HMenuItem>

      <Float
        v-else
        :show="status[item.id]"
        placement="right-start"
        :flip="{ fallbackPlacements: ['left-start', 'left', 'bottom', 'top'] }"
        shift
        :offset="8"
      >
        <HMenuItem @click="open(item.id)" as="div" v-slot="{ active, disabled }">
          <button
            :disabled="disabled"
            class="flex w-full items-center justify-between rounded px-2 py-1.5 transition hover:bg-muted"
            @mouseenter="open(item.id)"
            @mouseleave="delayClose(item.id)"
            :class="[active && 'bg-muted']"
          >
            <div class="inline-flex w-full items-center gap-2">
              <Icon :name="item.icon" class="h-4 w-4" v-if="item.icon" />
              <UIAvatar :src="item.avatar" class="h-4 w-4" v-if="item.avatar" />
              <p class="truncate">{{ item.label }}</p>
            </div>
            <span class="flex shrink-0 items-center justify-center">
              <Icon name="heroicons:chevron-right" class="h-4 w-4" />
            </span>
          </button>
        </HMenuItem>

        <UIDropdownItem
          class="border"
          :width="width"
          :items="item.children"
          @mouseenter="open(item.id)"
          @mouseleave="delayClose(item.id)"
          @close="$emit('close')"
        />
      </Float>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { Float } from "@headlessui-float/vue";

  const props = defineProps<{
    items: any[];
    hover?: boolean;
    width?: string;
  }>();

  const emit = defineEmits<{
    close: [any];
  }>();

  const defaultStatus: Record<string, boolean> = {};
  for (const item of props.items) {
    defaultStatus[item.id] = false;
  }

  const status = ref(defaultStatus) as Ref<Record<string, boolean>>;

  const delay = 200;
  const currentId = ref(null) as Ref<string | null>;
  const timer = ref(null) as Ref<ReturnType<typeof setTimeout> | null>;

  async function open(id: string) {
    if (currentId.value !== null && currentId.value !== id) {
      close(currentId.value);
    }

    if (timer.value !== null) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    currentId.value = id;
    status.value[id] = true;
  }

  function close(id: string) {
    currentId.value = null;
    status.value[id] = false;
  }

  function delayClose(id: string) {
    timer.value = setTimeout(() => {
      close(id);
    }, delay);
  }
</script>
