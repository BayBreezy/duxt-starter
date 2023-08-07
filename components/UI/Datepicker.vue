<template>
  <ClientOnly>
    <VDatePicker ref="calRef" v-bind="$attrs">
      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </VDatePicker>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { DatePicker as VDatePicker } from "v-calendar";
  import type { Calendar } from "v-calendar";

  type DateProps = Partial<InstanceType<typeof Calendar>["$props"]> &
    Partial<InstanceType<typeof VDatePicker>["$props"]>;

  interface Props extends /* @vue-ignore */ DateProps {}

  defineOptions({ inheritAttrs: false });
  defineProps<Props>();
  const calRef = ref<Props>();
  const emit = defineEmits<{
    ready: [arg: Props];
  }>();
  onMounted(() => {
    emit("ready", calRef as unknown as Props);
  });
</script>

<style>
  .vc-blue {
    --vc-accent-50: #f1f5f9;
    --vc-accent-100: #e2e8f0;
    --vc-accent-200: #cbd5e1;
    --vc-accent-300: #94a3b8;
    --vc-accent-400: #64748b;
    --vc-accent-500: #475569;
    --vc-accent-600: #334155;
    --vc-accent-700: #1e293b;
    --vc-accent-800: #0f172a;
    --vc-accent-900: #020617;
  }
  :root {
    --vc-gray-50: #f1f5f9;
    --vc-gray-100: #e2e8f0;
    --vc-gray-200: #cbd5e1;
    --vc-gray-300: #94a3b8;
    --vc-gray-400: #64748b;
    --vc-gray-500: #475569;
    --vc-gray-600: #334155;
    --vc-gray-700: #1e293b;
    --vc-gray-800: #0f172a;
    --vc-gray-900: #020617;
    --vc-font-family: theme("fontFamily.sans");
    --vc-rounded-full: theme("borderRadius.DEFAULT");
  }
  .vc-light,
  .vc-dark {
    --vc-bg: theme("colors.background");
    --vc-border: theme("colors.border");
    --vc-focus-ring: 0 0 0 2px theme("colors.ring");
    --vc-popover-content-bg: theme("colors.background");
    --vc-popover-content-border: theme("colors.input");
    --vc-time-picker-border: theme("colors.border");
    --vc-time-select-group-border: theme("colors.border");
    --vc-time-select-group-bg: theme("colors.muted.DEFAULT");
  }
</style>
