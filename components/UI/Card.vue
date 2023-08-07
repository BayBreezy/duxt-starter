<template>
  <div :class="cn('rounded-lg border bg-card p-6 text-card-foreground', props.class)">
    <slot :props="props" name="header">
      <div class="flex flex-col space-y-1.5">
        <slot :props="props" name="title">
          <h3 v-if="title" class="text-[22px] font-semibold leading-none tracking-tight">
            {{ title }}
          </h3>
        </slot>
        <slot v-if="subtitle" :props="props" name="subtitle">
          <p class="text-sm text-muted-foreground">
            {{ subtitle }}
          </p>
        </slot>
      </div>
    </slot>
    <slot :props="props"></slot>
    <slot :props="props" name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    /**
     * The title of the card
     */
    title?: string;
    /**
     * The subtitle of the card
     */
    subtitle?: string;
    class?: any;
  }>();
</script>
