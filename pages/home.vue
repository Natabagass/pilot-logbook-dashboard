<script setup lang="ts">
definePageMeta({ layout: 'default' })
</script>

<template>
  <div>
    <LayoutAppHeader />

    <main class="page-content">
      <!-- Upcoming Flight -->
      <section aria-labelledby="upcoming-heading" class="home-section">
        <div class="section-header">
          <h2 id="upcoming-heading" class="section-title">Upcoming Flight</h2>
        </div>
        <HomeUpcomingFlight />
      </section>

      <!-- Latest News -->
      <section aria-labelledby="news-heading" class="home-section">
        <div class="section-header">
          <h2 id="news-heading" class="section-title">Latest News</h2>
          <a href="#" class="section-link">See all</a>
        </div>
        <HomeNewsCarousel />
      </section>

      <!-- Hours to Limit -->
      <section aria-labelledby="hours-heading" class="home-section">
        <div class="section-header">
          <h2 id="hours-heading" class="section-title">Hours to Limit</h2>
        </div>
        <HoursToLimit />
      </section>

      <!-- My Documents -->
      <section aria-labelledby="docs-heading" class="home-section">
        <div class="section-header">
          <h2 id="docs-heading" class="section-title">My Documents</h2>
        </div>
        <HomeDocumentList />
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home-section {
  margin-bottom: $section-gap;
}
</style>
