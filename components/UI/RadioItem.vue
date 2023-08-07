<template>
  <HRadioGroupOption v-slot="{ active, checked, disabled }" v-bind="$attrs">
    <slot :active="active" :checked="checked" :disabled="disabled" />
  </HRadioGroupOption>
</template>
