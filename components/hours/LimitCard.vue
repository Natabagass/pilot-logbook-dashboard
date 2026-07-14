<script setup lang="ts">
interface Props {
  label: string
  current: number
  limit: number
}

const props = defineProps<Props>()

const pct = computed(() => Math.min((props.current / props.limit) * 100, 100))
const remaining = computed(() => Math.max(props.limit - props.current, 0))

const status = computed(() => {
  if (pct.value >= 100) return 'danger'
  if (pct.value >= 80) return 'warning'
  return 'info'
})
</script>

<template>
  <div class="limit-card card">
    <p class="limit-card__label">{{ label }}</p>

    <div class="limit-card__value">
      <span class="limit-card__current">{{ current.toFixed(1) }}</span>
      <span class="limit-card__limit">/ {{ limit }}h</span>
    </div>

    <div class="limit-card__bar-wrap">
      <div
        class="limit-card__bar"
        :class="`limit-card__bar--${status}`"
        :style="{ width: pct + '%' }"
      />
    </div>

    <p class="limit-card__remaining" :class="`limit-card__remaining--${status}`">
      {{ remaining.toFixed(1) }}h left
    </p>
  </div>
</template>

<style lang="scss" scoped>
.limit-card {
  flex-shrink: 0;
  width: 148px;
  display: flex;
  flex-direction: column;
  gap: $space-2;
  scroll-snap-align: start;

  &__label {
    font-size: 11px;
    font-weight: $font-semibold;
    color: $color-text-muted;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__value {
    display: flex;
    align-items: baseline;
    gap: 3px;
  }

  &__current {
    font-size: $font-2xl;
    font-weight: $font-bold;
    color: $color-text-primary;
    line-height: $leading-tight;
  }

  &__limit {
    font-size: $font-sm;
    color: $color-text-muted;
  }

  &__bar-wrap {
    height: 6px;
    background: $color-bg;
    border-radius: $radius-full;
    overflow: hidden;
  }

  &__bar {
    height: 100%;
    border-radius: $radius-full;
    transition: width $duration-chart $ease-standard;

    &--info    { background: $color-info; }
    &--warning { background: $color-warning; }
    &--danger  { background: $color-danger; }
  }

  &__remaining {
    font-size: $font-xs;
    font-weight: $font-medium;

    &--info    { color: $color-info; }
    &--warning { color: $color-warning; }
    &--danger  { color: $color-danger; }
  }
}
</style>
