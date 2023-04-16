<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'
import sun from '@/sprites/sun'
import mercury from '@/sprites/mercury'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value || !sun || !mercury) return

  const canvasW = innerWidth - 10
  const canvasH = innerHeight - 10

  const app = new PIXI.Application({
    width: canvasW,
    height: canvasH,
    view: canvasRef.value,
    backgroundColor: '#fde',
  })
  sun.x = app.screen.width / 2
  sun.y = app.screen.height / 2
  app.stage.addChild(sun)
  mercury.x = app.screen.width / 2 + 100
  mercury.y = app.screen.height / 2
  app.stage.addChild(mercury)
  let elapsed = 0.0
  app.ticker.add((delta) => {
    if (!mercury) return
    elapsed += delta
    mercury.x = app.screen.width / 2 + Math.cos(elapsed / 40) * 100
    mercury.y = app.screen.height / 2 + Math.sin(elapsed / 40) * 100
  })
})
</script>
