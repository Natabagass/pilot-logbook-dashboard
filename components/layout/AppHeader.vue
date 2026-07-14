<script setup lang="ts">
import { Bell, Plane } from 'lucide-vue-next'
import { usePilotStore } from '~/stores/pilot'

const pilot = usePilotStore()
const notifCount = 3

const initials = computed(() =>
  pilot.pilot.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
)
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__brand">
        <img
          :src="'/images/susiair-logo.png'"
          alt="Susi Air"
          class="app-header__logo"
          @error="($event.target as HTMLImageElement).style.display = 'none'"
        />
      </div>

      <button class="app-header__bell" aria-label="Notifications">
        <Bell :size="22" />
        <span v-if="notifCount > 0" class="app-header__badge">{{ notifCount }}</span>
      </button>
    </div>

    <div class="app-header__pilot">
      <div class="app-header__avatar" aria-hidden="true">{{ initials }}</div>
      <div>
        <p class="app-header__greeting">Good morning,</p>
        <p class="app-header__name">{{ pilot.pilot.name }}</p>
        <p class="app-header__hours">
          <Plane :size="12" />
          {{ pilot.pilot.totalFlightHours.toLocaleString() }} hrs total
        </p>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: $color-navy;
  padding: calc(16px + env(safe-area-inset-top)) $page-padding-x 16px;
  color: $color-text-on-dark;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $space-4;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__logo {
    height: 28px;
    width: auto;
    object-fit: contain;
    background: $color-surface;
    border-radius: $radius-md;
    padding: 4px 10px;
  }

  &__brand-name {
    font-size: $font-lg;
    font-weight: $font-bold;
    color: $color-text-on-dark;
    letter-spacing: -0.01em;
  }

  &__bell {
    position: relative;
    background: rgba(255, 255, 255, 0.12);
    border: none;
    color: $color-text-on-dark;
    width: 40px;
    height: 40px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background $duration-fast;

    &:active { background: rgba(255, 255, 255, 0.2); }
  }

  &__badge {
    position: absolute;
    top: 6px;
    right: 6px;
    background: $color-red;
    color: white;
    font-size: 9px;
    font-weight: $font-bold;
    min-width: 14px;
    height: 14px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    border: 1.5px solid $color-navy;
  }

  &__pilot {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__avatar {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: $radius-full;
    background: $color-red;
    color: $color-text-on-dark;
    font-size: $font-sm;
    font-weight: $font-bold;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.04em;
  }

  &__greeting {
    font-size: $font-xs;
    font-weight: $font-normal;
    color: rgba(255, 255, 255, 0.6);
  }

  &__name {
    font-size: $font-xl;
    font-weight: $font-bold;
    line-height: $leading-tight;
  }

  &__hours {
    display: flex;
    align-items: center;
    gap: $space-1;
    font-size: $font-xs;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 2px;
  }
}
</style>
