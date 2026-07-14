<script setup lang="ts">
import { ArrowRight, CalendarDays, Clock } from 'lucide-vue-next'

const flight = {
  date: '31 May 2026',
  time: '06:30',
  dep: { icao: 'HLP', city: 'Jakarta Halim' },
  arr: { icao: 'CJN', city: 'Pangandaran' },
}
</script>

<template>
  <div class="upcoming-flight">
    <div class="upcoming-flight__meta">
      <span class="upcoming-flight__chip">UPCOMING FLIGHT</span>
      <span class="upcoming-flight__date">
        <CalendarDays :size="12" />
        {{ flight.date }}
      </span>
    </div>

    <div class="upcoming-flight__route">
      <div class="upcoming-flight__station">
        <span class="upcoming-flight__icao">{{ flight.dep.icao }}</span>
        <span class="upcoming-flight__city">{{ flight.dep.city }}</span>
      </div>

      <div class="upcoming-flight__center">
        <span class="upcoming-flight__time">
          <Clock :size="12" />
          {{ flight.time }}
        </span>
        <div class="upcoming-flight__line">
          <span class="upcoming-flight__dot" />
          <ArrowRight :size="16" />
          <span class="upcoming-flight__dot" />
        </div>
      </div>

      <div class="upcoming-flight__station upcoming-flight__station--right">
        <span class="upcoming-flight__icao">{{ flight.arr.icao }}</span>
        <span class="upcoming-flight__city">{{ flight.arr.city }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upcoming-flight {
  background: $color-navy;
  border-radius: $radius-xl;
  padding: $space-4 $space-5;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__chip {
    font-size: 10px;
    font-weight: $font-semibold;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: $space-1;
    font-size: $font-xs;
    color: rgba(255, 255, 255, 0.6);
  }

  &__route {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
  }

  &__station {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &--right {
      align-items: flex-end;
    }
  }

  &__icao {
    font-size: $font-2xl;
    font-weight: $font-bold;
    color: $color-text-on-dark;
    line-height: $leading-tight;
    letter-spacing: -0.02em;
  }

  &__city {
    font-size: $font-xs;
    color: rgba(255, 255, 255, 0.55);
  }

  &__center {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-1;
  }

  &__time {
    display: flex;
    align-items: center;
    gap: $space-1;
    font-size: $font-sm;
    font-weight: $font-bold;
    color: $color-red;
  }

  &__line {
    display: flex;
    align-items: center;
    gap: $space-1;
    color: rgba(255, 255, 255, 0.35);
    width: 100%;
    justify-content: center;
  }

  &__dot {
    width: 5px;
    height: 5px;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.35);
    flex-shrink: 0;
  }
}
</style>
