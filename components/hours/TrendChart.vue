<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type ChartOptions,
  type ChartData,
} from 'chart.js'
import type { ChartToggle } from '~/stores/pilot'
import { usePilotStore } from '~/stores/pilot'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const props = defineProps<{ toggle: ChartToggle }>()

const store = usePilotStore()

const TODAY_IDX = 7 // index of today in the 15-point array

const chartData = computed<ChartData<'line'>>(() => {
  const { points, limit, max } = store.chartPoints(props.toggle)

  return {
    labels: points.map((p) => p.label),
    datasets: [
      {
        label: 'Rolling Hours',
        data: points.map((p) => p.value),
        borderColor: '#22C5E8',
        borderWidth: 2,
        pointRadius: points.map((_, i) => (i === TODAY_IDX ? 5 : 2)),
        pointBackgroundColor: points.map((_, i) =>
          i === TODAY_IDX ? '#E63757' : '#22C5E8'
        ),
        pointBorderColor: points.map((_, i) =>
          i === TODAY_IDX ? '#E63757' : '#22C5E8'
        ),
        fill: true,
        backgroundColor: 'rgba(34, 197, 232, 0.08)',
        tension: 0.35,
      },
      {
        label: 'Limit',
        data: Array(points.length).fill(limit),
        borderColor: '#E63757',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
        tension: 0,
      },
    ],
  }
})

const chartOptions = computed<ChartOptions<'line'>>(() => {
  const { max } = store.chartPoints(props.toggle)

  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => (ctx.datasetIndex === 0 ? ` ${ctx.parsed.y.toFixed(1)}h` : ''),
          title: (items) => items[0]?.label ?? '',
        },
        backgroundColor: '#0E2138',
        titleColor: 'rgba(255,255,255,0.6)',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#9CA3AF',
          font: { size: 10, family: 'Inter' },
          maxRotation: 0,
          callback: (_val, idx) => {
            // Show every other label to avoid crowding
            return idx % 2 === 0
              ? chartData.value.labels?.[idx]
              : ''
          },
        },
      },
      y: {
        min: 0,
        max,
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          color: '#9CA3AF',
          font: { size: 10, family: 'Inter' },
          maxTicksLimit: 5,
          callback: (val) => `${val}h`,
        },
      },
    },
  }
})
</script>

<template>
  <div class="trend-chart">
    <ClientOnly>
      <Line :data="chartData" :options="chartOptions" />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.trend-chart {
  height: 180px;
  width: 100%;
}
</style>
