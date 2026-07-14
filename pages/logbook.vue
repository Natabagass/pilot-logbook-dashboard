<script setup lang="ts">
definePageMeta({ layout: 'default' })
</script>

<template>
  <div>
    <LayoutAppHeader />
    <main class="page-content">
      <div class="stub">
        <p class="stub__icon">📋</p>
        <h2 class="stub__title">Logbook</h2>
        <p class="stub__sub">Coming soon</p>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.stub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: $space-2;
  text-align: center;

  &__icon { font-size: 48px; }
  &__title { font-size: $font-xl; font-weight: $font-bold; color: $color-text-primary; }
  &__sub { font-size: $font-base; color: $color-text-muted; }
}
</style>
