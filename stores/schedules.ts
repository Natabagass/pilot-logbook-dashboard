import { defineStore } from 'pinia'
import schedulesData from '~/docs/mock-schedules.json'

export const useSchedulesStore = defineStore('schedules', () => {
  const legend = schedulesData.legend
  const schedules = schedulesData.schedules

  // Current displayed month (default: May 2026 = today's month)
  const currentYear = ref(2026)
  const currentMonth = ref(4) // 0-indexed, 4 = May

  const currentMonthLabel = computed(() => {
    const d = new Date(currentYear.value, currentMonth.value, 1)
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  })

  function prevMonth() {
    if (currentMonth.value === 0) {
      currentMonth.value = 11
      currentYear.value--
    } else {
      currentMonth.value--
    }
  }

  function nextMonth() {
    if (currentMonth.value === 11) {
      currentMonth.value = 0
      currentYear.value++
    } else {
      currentMonth.value++
    }
  }

  // Map schedules by date string for O(1) lookup
  const scheduleMap = computed(() => {
    const map = new Map<string, typeof schedules[0]>()
    for (const s of schedules) {
      map.set(s.duty_date, s)
    }
    return map
  })

  // Calendar grid: array of weeks, each week is 7 days (null = outside month)
  const calendarGrid = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDow = firstDay.getDay() // 0=Sun

    const grid: (number | null)[][] = []
    let week: (number | null)[] = Array(startDow).fill(null)

    for (let d = 1; d <= lastDay.getDate(); d++) {
      week.push(d)
      if (week.length === 7) {
        grid.push(week)
        week = []
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null)
      grid.push(week)
    }

    return grid
  })

  function getSchedule(day: number | null) {
    if (!day) return null
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return scheduleMap.value.get(dateStr) ?? null
  }

  // Upcoming flight for home page: next DTY after today
  const upcomingFlight = computed(() => {
    const today = '2026-05-31'
    return schedules.find(
      (s) => s.duty_date >= today && s.duty_type === 'DTY' && s.status === 1
    ) ?? schedules.find((s) => s.duty_date >= today)
  })

  return {
    legend,
    schedules,
    currentYear,
    currentMonth,
    currentMonthLabel,
    prevMonth,
    nextMonth,
    calendarGrid,
    getSchedule,
    upcomingFlight,
  }
})
