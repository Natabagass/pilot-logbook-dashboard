<script setup lang="ts">
const news = [
  {
    id: 1,
    category: 'Operations',
    title: 'Route Update: New Schedule for Eastern Indonesia',
    date: '28 May 2026',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80',
  },
  {
    id: 2,
    category: 'Safety',
    title: 'Mandatory Briefing: Updated Weather Reporting Protocol',
    date: '25 May 2026',
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=400&q=80',
  },
  {
    id: 3,
    category: 'Company',
    title: 'Fleet Addition: Two New Caravan Aircraft Join Operations',
    date: '20 May 2026',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400&q=80',
  },
]
</script>

<template>
  <div class="news-carousel">
    <div
      v-for="item in news"
      :key="item.id"
      class="news-card"
    >
      <img
        :src="item.image"
        :alt="item.title"
        class="news-card__image"
        loading="lazy"
      />
      <div class="news-card__body">
        <span class="news-card__category">{{ item.category }}</span>
        <p class="news-card__title">{{ item.title }}</p>
        <span class="news-card__date">{{ item.date }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-carousel {
  display: flex;
  gap: $space-3;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: $space-1;

  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;
}

.news-card {
  flex-shrink: 0;
  width: 200px;
  background: $color-surface;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  overflow: hidden;
  scroll-snap-align: start;

  &__image {
    width: 100%;
    height: 110px;
    object-fit: cover;
    display: block;
  }

  &__body {
    padding: $space-3;
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__category {
    font-size: 11px;
    font-weight: $font-semibold;
    color: $color-red;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__title {
    font-size: $font-sm;
    font-weight: $font-semibold;
    color: $color-text-primary;
    line-height: $leading-normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: $font-xs;
    color: $color-text-muted;
    margin-top: $space-1;
  }
}
</style>
