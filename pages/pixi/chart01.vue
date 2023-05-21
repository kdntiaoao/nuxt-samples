<template>
  <div>
    <RadarChart :width="300" :height="300" :data="data1" :min="10" :max="50" />
    <!-- min は 0 より大きい最小値です -->
    <RadarChart :width="300" :height="300" :data="data2" :min="0.05" :max="1" />
  </div>
</template>

<script setup lang="ts">
import RadarChart from '~/components/pixi/RadarChart.vue'
import { DataItem } from '~/sprites/chart01/RadarChartData'

const data1 = ref<DataItem[]>([
  { label: 'Category 1', value: 20 },
  { label: 'Category 2', value: 15 },
  { label: 'Category 3', value: 50 },
  { label: 'Category 4', value: 30 },
  { label: 'Category 5', value: 42 },
  { label: 'Category 6', value: 27 },
])
const data2 = ref<DataItem[]>([
  { label: 'Category 2', value: 0 },
  { label: 'Category 3', value: 100 },
  { label: 'Category 4', value: 0.2 },
  { label: 'Category 5', value: 1 },
  { label: 'Category 6', value: 0 },
])
</script>

<style scoped>
canvas {
  outline: 1px solid red;
}
</style>
