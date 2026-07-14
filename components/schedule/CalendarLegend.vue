<script setup lang="ts">
const props = defineProps<{
  legend: Array<{ code: string; label: string; color: string }>
}>()
</script>

<template>
  <div class="cal-legend">
    <div
      v-for="item in legend"
      :key="item.code"
      class="cal-legend__item"
    >
      <span class="cal-legend__dot" :style="{ background: item.color }" />
      <span class="cal-legend__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cal-legend {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-2 $space-4;
  padding: $space-4 $card-padding;
  background: $color-surface;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;

  &__item {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: $radius-full;
    flex-shrink: 0;
  }

  &__label {
    font-size: $font-xs;
    color: $color-text-secondary;
  }
}
</style>
