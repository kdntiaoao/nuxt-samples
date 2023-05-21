<template>
  <div>
    <RadarChart :width="300" :height="300" :data="data1" />
    <RadarChart :width="300" :height="300" :data="data2" />
  </div>
</template>

<script setup lang="ts">
import RadarChart from '~/components/pixi/RadarChart.vue'
import { DataItem } from '~/sprites/chart01/RadarChartData'

const data1 = ref<DataItem[]>([
  { label: 'Category 1', value: 0.8 },
  { label: 'Category 2', value: 0.6 },
  { label: 'Category 3', value: 1 },
  { label: 'Category 4', value: 0.75 },
  { label: 'Category 5', value: 0.5 },
  { label: 'Category 6', value: 0.3 },
])
const data2 = ref<DataItem[]>([
  { label: 'Category 1', value: 0 },
  { label: 'Category 2', value: 0 },
  { label: 'Category 3', value: 0 },
  { label: 'Category 4', value: 0 },
  { label: 'Category 5', value: 1 },
  { label: 'Category 6', value: 0 },
])
</script>

<style scoped>
canvas {
  outline: 1px solid red;
}
</style>
