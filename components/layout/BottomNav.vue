<script setup lang="ts">
import { Home, CalendarDays } from 'lucide-vue-next'

const route = useRoute()

const navItems = [
  { label: 'Home',     icon: Home,         path: '/home' },
  { label: 'Schedule', icon: CalendarDays, path: '/schedule' },
]
</script>

<template>
  <nav class="bottom-nav" aria-label="Main navigation">
    <NuxtLink
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': route.path === item.path }"
    >
      <component :is="item.icon" :size="20" class="bottom-nav__icon" />
      <span class="bottom-nav__label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: calc(#{$bottom-nav-height} + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: $color-surface;
  box-shadow: $shadow-nav;
  display: flex;
  align-items: flex-start;
  padding-top: 8px;
  z-index: 100;

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    text-decoration: none;
    color: $color-text-muted;
    padding: 4px 0;
    transition: color $duration-fast $ease-standard;

    &--active {
      color: $color-red;
    }

    &:active {
      opacity: 0.7;
    }
  }

  &__icon {
    transition: transform $duration-fast $ease-standard;

    .bottom-nav__item--active & {
      transform: scale(1.05);
    }
  }

  &__label {
    font-size: 10px;
    font-weight: $font-medium;

    .bottom-nav__item--active & {
      font-weight: $font-semibold;
    }
  }
}
</style>
