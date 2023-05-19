<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

type Props = {
  width?: number
  height?: number
  apexesCount?: number
}

const props = withDefaults(defineProps<Props>(), { width: 400, height: 400, apexesCount: 6 })

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
  const radius = Math.min(app.screen.width / 2, app.screen.height / 2) - 10

  const points = []
  for (let i = 0; i < props.apexesCount; i++) {
    const radian = (2 / props.apexesCount) * Math.PI * i
    points.push([Math.sin(radian) * radius, -Math.cos(radian) * radius])
  }
  const bottomPointY = Math.max(...points.map((p) => p[1]))

  const fixedPoints = points
    .map((point) => [point[0] + centerX, point[1] + centerY + (radius - bottomPointY) / 2])
    .flat()

  const polygon = new PIXI.Graphics()
    .beginFill(0x000000)
    .drawPolygon(...fixedPoints)
    .endFill()
  container.addChild(polygon)
})
</script>
