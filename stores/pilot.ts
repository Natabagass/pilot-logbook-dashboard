import { defineStore } from 'pinia'
import flightHoursData from '~/docs/mock-flight-hours.json'

// Treat today as 2026-05-31 per brief
const TODAY = '2026-05-31'

export type ChartToggle = '1w' | '1m' | '3m' | '6m' | '1y'

interface FlightDay {
  date: string
  hours: number
}

function dateToMs(dateStr: string): number {
  return new Date(dateStr + 'T00:00:00').getTime()
}

const hoursMap = new Map<string, number>(
  (flightHoursData.flightHours as FlightDay[]).map((d) => [d.date, d.hours])
)

function getHours(dateStr: string): number {
  return hoursMap.get(dateStr) ?? 0
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

function rollingSum(endDate: string, windowDays: number): number {
  let total = 0
  for (let i = 0; i < windowDays; i++) {
    total += getHours(addDays(endDate, -i))
  }
  return Math.round(total * 10) / 10
}

export const usePilotStore = defineStore('pilot', () => {
  const pilot = flightHoursData.pilot
  const limits = flightHoursData.limits
  const chartBounds = flightHoursData.chartBounds as Record<string, { limit: number; max: number; windowDays: number }>

  const limitCards = computed(() => [
    {
      label: 'Daily',
      current: rollingSum(TODAY, 1),
      limit: limits.daily,
    },
    {
      label: 'Weekly',
      current: rollingSum(TODAY, 7),
      limit: limits.weekly,
    },
    {
      label: 'Monthly',
      current: rollingSum(TODAY, 30),
      limit: limits.monthly,
    },
    {
      label: 'Annual',
      current: rollingSum(TODAY, 365),
      limit: limits.annual,
    },
  ])

  function chartPoints(toggle: ChartToggle) {
    const { windowDays, limit, max } = chartBounds[toggle]
    const points: { date: string; label: string; value: number }[] = []

    for (let i = -7; i <= 7; i++) {
      const date = addDays(TODAY, i)
      const value = rollingSum(date, windowDays)
      const d = new Date(date + 'T00:00:00')
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      points.push({ date, label, value })
    }

    return { points, limit, max }
  }

  return { pilot, limits, chartBounds, limitCards, chartPoints }
})
