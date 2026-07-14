<script setup lang="ts">
import { ChevronLeft, ChevronRight, X, MapPin, Plane, ClipboardList, CheckCircle, Clock } from 'lucide-vue-next'
import { useSchedulesStore } from '~/stores/schedules'

definePageMeta({ layout: 'default' })

const store = useSchedulesStore()

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TODAY_STR = '2026-05-31'

function isToday(day: number | null): boolean {
  if (!day) return false
  const dateStr = `${store.currentYear}-${String(store.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return dateStr === TODAY_STR
}

// ── Detail modal ──────────────────────────────────────────
const showDetail = ref(false)
const selectedDay = ref<number | null>(null)

const selectedSchedule = computed(() => {
  if (!selectedDay.value) return null
  return store.getSchedule(selectedDay.value)
})

const selectedDateLabel = computed(() => {
  if (!selectedDay.value) return ''
  const d = new Date(
    store.currentYear,
    store.currentMonth,
    selectedDay.value
  )
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
})

const dutyLabel = computed(() => {
  if (!selectedSchedule.value) return ''
  return store.legend.find((l) => l.code === selectedSchedule.value!.duty_type)?.label ?? selectedSchedule.value.duty_type
})

const isLogged = computed(() =>
  selectedSchedule.value &&
  selectedSchedule.value.count_logbooks === selectedSchedule.value.count_schedules
)

function handleDayTap(day: number) {
  selectedDay.value = day
  showDetail.value = true
}

function closeDetail() {
  showDetail.value = false
}
</script>

<template>
  <div>
    <LayoutAppHeader />

    <main class="page-content">
      <!-- Month Navigation -->
      <div class="cal-nav">
        <button class="cal-nav__btn" aria-label="Previous month" @click="store.prevMonth()">
          <ChevronLeft :size="20" />
        </button>
        <h2 class="cal-nav__label">{{ store.currentMonthLabel }}</h2>
        <button class="cal-nav__btn" aria-label="Next month" @click="store.nextMonth()">
          <ChevronRight :size="20" />
        </button>
      </div>

      <!-- Calendar Grid -->
      <div class="cal-grid-wrap card">
        <div class="cal-dow">
          <span v-for="d in DOW_LABELS" :key="d" class="cal-dow__cell">{{ d }}</span>
        </div>
        <div v-for="(week, wi) in store.calendarGrid" :key="wi" class="cal-week">
          <ScheduleCalendarDay
            v-for="(day, di) in week"
            :key="di"
            :day="day"
            :schedule="store.getSchedule(day)"
            :is-today="isToday(day)"
            @tap="handleDayTap"
          />
        </div>
      </div>

      <!-- Badge hint -->
      <div class="cal-hint">
        <span class="cal-hint__item">
          <span class="cal-hint__dot">3</span>
          Jumlah penerbangan
        </span>
        <span class="cal-hint__item">
          <span class="cal-hint__dot">✓</span>
          Sudah dilog semua
        </span>
      </div>

      <!-- Legend -->
      <div class="home-section">
        <div class="section-header">
          <h3 class="section-title">Legend</h3>
        </div>
        <ScheduleCalendarLegend :legend="store.legend" />
      </div>
    </main>

    <!-- Detail Modal -->
    <Transition name="overlay-fade">
      <div v-if="showDetail" class="detail-overlay" @click="closeDetail" />
    </Transition>

    <Transition name="sheet-slide">
      <div v-if="showDetail" class="detail-sheet" role="dialog" aria-modal="true">
        <div class="detail-sheet__handle" />

        <!-- Header -->
        <div class="detail-sheet__header">
          <div>
            <p class="detail-sheet__date">{{ selectedDateLabel }}</p>
            <div v-if="selectedSchedule" class="detail-sheet__duty-row">
              <span
                class="detail-sheet__duty-badge"
                :style="{ background: selectedSchedule.base_color }"
              >
                {{ selectedSchedule.duty_type }}
              </span>
              <span class="detail-sheet__duty-label">{{ dutyLabel }}</span>
            </div>
            <p v-else class="detail-sheet__no-duty">No duty scheduled</p>
          </div>
          <button class="detail-sheet__close" aria-label="Close" @click="closeDetail">
            <X :size="18" />
          </button>
        </div>

        <!-- Content: has schedule -->
        <template v-if="selectedSchedule">
          <div class="detail-rows">

            <!-- Base / Location -->
            <div class="detail-row">
              <div class="detail-row__icon">
                <MapPin :size="16" />
              </div>
              <div class="detail-row__body">
                <p class="detail-row__label">Base / Airport</p>
                <p class="detail-row__value">{{ selectedSchedule.base_name }}</p>
              </div>
            </div>

            <!-- Flights scheduled -->
            <div class="detail-row">
              <div class="detail-row__icon">
                <Plane :size="16" />
              </div>
              <div class="detail-row__body">
                <p class="detail-row__label">Flights Scheduled</p>
                <p class="detail-row__value">{{ selectedSchedule.count_schedules }} flight{{ selectedSchedule.count_schedules !== 1 ? 's' : '' }}</p>
              </div>
            </div>

            <!-- Logbook progress -->
            <div class="detail-row">
              <div class="detail-row__icon">
                <ClipboardList :size="16" />
              </div>
              <div class="detail-row__body">
                <p class="detail-row__label">Logbook Progress</p>
                <div class="detail-row__progress-wrap">
                  <p class="detail-row__value">
                    {{ selectedSchedule.count_logbooks }} / {{ selectedSchedule.count_schedules }} logged
                  </p>
                  <div class="detail-row__bar">
                    <div
                      class="detail-row__bar-fill"
                      :style="{
                        width: (selectedSchedule.count_logbooks / selectedSchedule.count_schedules * 100) + '%',
                        background: isLogged ? '#1FBF8F' : '#22C5E8'
                      }"
                    />
                  </div>
                </div>
              </div>
              <CheckCircle v-if="isLogged" :size="18" class="detail-row__check" />
            </div>

            <!-- Status -->
            <div class="detail-row">
              <div class="detail-row__icon">
                <Clock :size="16" />
              </div>
              <div class="detail-row__body">
                <p class="detail-row__label">Status</p>
                <span
                  class="badge"
                  :class="selectedSchedule.status === 2 ? 'badge--success' : 'badge--info'"
                >
                  {{ selectedSchedule.status === 2 ? 'Completed' : 'Upcoming' }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <!-- Content: no schedule -->
        <div v-else class="detail-empty">
          <p class="detail-empty__icon">📅</p>
          <p class="detail-empty__text">Tidak ada jadwal di hari ini</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.cal-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $space-4;

  &__btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: $radius-full;
    background: $color-surface;
    color: $color-text-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: $shadow-card;
    transition: background $duration-fast;
    &:active { background: $color-surface-alt; }
  }

  &__label {
    font-size: $font-lg;
    font-weight: $font-semibold;
    color: $color-text-primary;
  }
}

.cal-grid-wrap {
  padding: $space-3;
  margin-bottom: $space-3;
}

.cal-dow {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: $space-2;

  &__cell {
    text-align: center;
    font-size: $font-xs;
    font-weight: $font-medium;
    color: $color-text-muted;
    padding: $space-1 0;
  }
}

.cal-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;
}

.cal-hint {
  display: flex;
  gap: $space-4;
  margin-bottom: $section-gap;

  &__item {
    display: flex;
    align-items: center;
    gap: $space-1;
    font-size: $font-xs;
    color: $color-text-muted;
  }

  &__dot {
    font-size: 9px;
    font-weight: $font-bold;
    min-width: 14px;
    height: 14px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($color-navy, 0.12);
    color: $color-navy;
  }
}

.home-section {
  margin-bottom: $section-gap;
}

// ── Overlay ───────────────────────────────────────────────
.detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 200;
}

// ── Bottom sheet ──────────────────────────────────────────
.detail-sheet {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: $color-surface;
  border-radius: $radius-xl $radius-xl 0 0;
  padding: $space-3 $space-5 calc(#{$space-8} + env(safe-area-inset-bottom));
  z-index: 201;
  display: flex;
  flex-direction: column;
  gap: $space-4;

  &__handle {
    width: 36px;
    height: 4px;
    background: #E5E7EB;
    border-radius: $radius-full;
    margin: 0 auto $space-1;
  }

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-3;
  }

  &__date {
    font-size: $font-sm;
    color: $color-text-secondary;
    margin-bottom: $space-2;
  }

  &__duty-row {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__duty-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: $radius-pill;
    font-size: 11px;
    font-weight: $font-bold;
    color: white;
    letter-spacing: 0.04em;
  }

  &__duty-label {
    font-size: $font-lg;
    font-weight: $font-semibold;
    color: $color-text-primary;
  }

  &__no-duty {
    font-size: $font-lg;
    font-weight: $font-semibold;
    color: $color-text-muted;
  }

  &__close {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: $radius-full;
    background: $color-bg;
    color: $color-text-secondary;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background $duration-fast;
    &:active { background: #E5E7EB; }
  }
}

// ── Detail rows ───────────────────────────────────────────
.detail-rows {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: $color-bg;
  border-radius: $radius-lg;
  overflow: hidden;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-4;
  background: $color-surface;
  border-bottom: 1px solid $color-bg;

  &:last-child { border-bottom: none; }

  &__icon {
    width: 32px;
    height: 32px;
    border-radius: $radius-md;
    background: $color-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-text-secondary;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__label {
    font-size: $font-xs;
    color: $color-text-muted;
    margin-bottom: 2px;
  }

  &__value {
    font-size: $font-base;
    font-weight: $font-semibold;
    color: $color-text-primary;
  }

  &__progress-wrap {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__bar {
    height: 4px;
    background: $color-bg;
    border-radius: $radius-full;
    overflow: hidden;
    width: 100%;
  }

  &__bar-fill {
    height: 100%;
    border-radius: $radius-full;
    transition: width $duration-normal $ease-standard;
  }

  &__check {
    color: $color-success;
    flex-shrink: 0;
  }
}

// ── Empty state ───────────────────────────────────────────
.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-2;
  padding: $space-8 0;

  &__icon { font-size: 36px; }

  &__text {
    font-size: $font-base;
    color: $color-text-muted;
  }
}

// ── Transitions ───────────────────────────────────────────
.overlay-fade-enter-active, .overlay-fade-leave-active {
  transition: opacity $duration-normal $ease-standard;
}
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }

.sheet-slide-enter-active, .sheet-slide-leave-active {
  transition: transform $duration-slow $ease-decel;
}
.sheet-slide-enter-from, .sheet-slide-leave-to {
  transform: translateX(-50%) translateY(100%);
}
</style>
