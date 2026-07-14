<script setup lang="ts">
import type { ChartToggle } from '~/stores/pilot'

const props = defineProps<{ modelValue: ChartToggle }>()
const emit = defineEmits<{ 'update:modelValue': [value: ChartToggle] }>()

const options: ChartToggle[] = ['1w', '1m', '3m', '6m', '1y']
</script>

<template>
  <div class="range-toggle" role="group" aria-label="Chart range">
    <button
      v-for="opt in options"
      :key="opt"
      class="range-toggle__btn"
      :class="{ 'range-toggle__btn--active': modelValue === opt }"
      @click="emit('update:modelValue', opt)"
    >
      {{ opt }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.range-toggle {
  display: flex;
  gap: $space-1;
  background: $color-bg;
  border-radius: $radius-pill;
  padding: 3px;

  &__btn {
    flex: 1;
    height: 28px;
    border: none;
    border-radius: $radius-pill;
    font-size: $font-xs;
    font-weight: $font-medium;
    font-family: $font-family;
    cursor: pointer;
    background: transparent;
    color: $color-text-muted;
    transition: background $duration-fast $ease-standard,
                color $duration-fast $ease-standard;

    &--active {
      background: $color-navy;
      color: $color-text-on-dark;
      font-weight: $font-semibold;
    }

    &:not(&--active):active {
      background: rgba($color-navy, 0.08);
    }
  }
}
</style>
