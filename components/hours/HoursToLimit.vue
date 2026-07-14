<script setup lang="ts">
import { usePilotStore } from '~/stores/pilot'
import type { ChartToggle } from '~/stores/pilot'

const store = usePilotStore()
const toggle = ref<ChartToggle>('1w')
</script>

<template>
  <div class="hours-section">
    <!-- Limit Summary Cards -->
    <div class="hours-section__cards">
      <HoursLimitCard
        v-for="card in store.limitCards"
        :key="card.label"
        :label="card.label"
        :current="card.current"
        :limit="card.limit"
      />
    </div>

    <!-- Trend Chart -->
    <div class="hours-section__chart card">
      <HoursTrendChart :toggle="toggle" />
      <HoursRangeToggle v-model="toggle" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hours-section {
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__cards {
    display: flex;
    gap: $space-3;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: $space-1;
    margin: 0 (-$page-padding-x);
    padding-left: $page-padding-x;
    padding-right: $page-padding-x;

    &::-webkit-scrollbar { display: none; }
    scrollbar-width: none;
  }

  &__chart {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }
}
</style>
