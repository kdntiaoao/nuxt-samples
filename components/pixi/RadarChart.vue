<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'
import { RadarChartBase } from '~/sprites/chart01/RadarChartBase'
import { DataItem, RadarChartData } from '~/sprites/chart01/RadarChartData'
import { RadarChartScales } from '~/sprites/chart01/RadarChartScales'

type Props = {
  width?: number
  height?: number
  data: DataItem[]
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 400,
  min: 10,
  max: 100,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return

  const app = new PIXI.Application({
    width: props.width,
    height: props.height,
    antialias: true,
    view: canvasRef.value,
    backgroundColor: '#000',
    backgroundAlpha: 0,
  })

  const container = new PIXI.Container()
  container.sortableChildren = true
  app.stage.addChild(container)

  const centerX = app.screen.width / 2
  const centerY = app.screen.height / 2
  const radius = Math.min(app.screen.width / 2, app.screen.height / 2) - 20

  const radarChartBase = new RadarChartBase(centerX, centerY, radius, props.data.length, 0xcccccc)
  container.addChild(radarChartBase)

  const radarChartData = new RadarChartData(centerX, centerY, radius, props.data, props.min, props.max, 0xaaaaaa)
  container.addChild(radarChartData)

  const radarChartScales = new RadarChartScales(centerX, centerY, radius, props.data.length, 4, 0x555555)
  container.addChild(radarChartScales)
})
</script>
