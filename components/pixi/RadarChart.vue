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

  const points = getPolygonApexesPoints(props.data.length, radius)
  const bottomPointY = Math.max(...points.map((p) => p[1]))
  const fixedPoints = points.map((point) => [point[0] + centerX, point[1] + centerY + (radius - bottomPointY) / 2])

  for (let i = 0; i < props.data.length; i++) {
    const d = props.data[i]
    const label = d.label
    const value = d.value

    const text = new PIXI.Text(label, {
      fontFamily: 'Arial',
      fontSize: 14,
      fill: 0xff1010,
      align: 'center',
    })

    text.x = fixedPoints[i][0] - text.width / 2
    text.y = fixedPoints[i][1] - text.height / 2

    container.addChild(text)
  }
})
</script>
