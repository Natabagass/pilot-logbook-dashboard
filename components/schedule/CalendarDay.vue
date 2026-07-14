<script setup lang="ts">
import { Check } from 'lucide-vue-next'

interface Schedule {
  id: string
  duty_date: string
  status: number
  base_name: string
  base_color: string
  duty_type: string
  count_schedules: number
  count_logbooks: number
}

interface Props {
  day: number | null
  schedule: Schedule | null
  isToday: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ tap: [day: number] }>()

const isFullyLogged = computed(
  () =>
    props.schedule &&
    props.schedule.count_logbooks === props.schedule.count_schedules
)
</script>

<template>
  <!-- Empty cell (outside month) -->
  <div v-if="!day" class="cal-day cal-day--empty" />

  <!-- Day cell -->
  <div
    v-else
    class="cal-day"
    :class="{
      'cal-day--today': isToday,
      'cal-day--duty': !!schedule,
    }"
    :style="schedule ? { '--duty-color': schedule.base_color } : {}"
    role="button"
    :aria-label="`${day}${schedule ? ', ' + schedule.duty_type : ''}`"
    @click="emit('tap', day)"
  >
    <!-- Day number -->
    <span class="cal-day__num">{{ day }}</span>

    <!-- Base code (DTY days show airport, others show duty type) -->
    <span v-if="schedule" class="cal-day__base">{{ schedule.base_name }}</span>

    <!-- Flight count badge — top right -->
    <span
      v-if="schedule && !isFullyLogged && schedule.count_schedules > 0"
      class="cal-day__count"
      :title="`${schedule.count_schedules} flight(s)`"
    >
      {{ schedule.count_schedules }}
    </span>

    <!-- Fully logged tick -->
    <span v-if="isFullyLogged" class="cal-day__tick">
      <Check :size="9" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.cal-day {
  aspect-ratio: 1;
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  min-height: 44px;
  background: $color-bg;
  border: 1px solid #E9EBF0;
  transition: opacity $duration-fast, transform $duration-fast;

  &--empty {
    background: transparent;
    border: none;
    cursor: default;
    pointer-events: none;
  }

  &--today:not(&--duty) {
    border: 2px solid $color-red;
    background: rgba($color-red, 0.04);
  }

  &--today.cal-day--duty {
    outline: 2px solid $color-red;
    outline-offset: 1px;
  }

  &--duty {
    background: var(--duty-color);
    border-color: transparent;
  }

  &:not(&--empty):active {
    opacity: 0.72;
    transform: scale(0.94);
  }

  &__num {
    font-size: $font-sm;
    font-weight: $font-semibold;
    line-height: 1;
    color: $color-text-primary;

    .cal-day--duty & { color: white; }
    .cal-day--today:not(.cal-day--duty) & { color: $color-red; font-weight: $font-bold; }
  }

  &__base {
    font-size: 9px;
    font-weight: $font-medium;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 2px;
    line-height: 1;
    letter-spacing: 0.02em;
  }

  &__count {
    position: absolute;
    top: 3px;
    right: 3px;
    background: rgba(255, 255, 255, 0.92);
    color: $color-navy;
    font-size: 9px;
    font-weight: $font-bold;
    min-width: 14px;
    height: 14px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    line-height: 1;

    .cal-day:not(.cal-day--duty) & {
      background: $color-red;
      color: white;
    }

    @media (max-width: 767px) {
      top: 2px;
      right: 2px;
      font-size: 8px;
      min-width: 12px;
      height: 12px;
      padding: 0 2px;
    }
  }

  &__tick {
    position: absolute;
    top: 3px;
    right: 3px;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    width: 14px;
    height: 14px;
    border-radius: $radius-full;

    @media (max-width: 767px) {
      top: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
    }
  }
}
</style>
