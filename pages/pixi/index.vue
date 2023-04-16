<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'
import { Sun } from '@/sprites/Sun'
import { Planet } from '@/sprites/Planet'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    view: canvasRef.value,
    backgroundColor: '#fde',
  })
  const sun = new Sun(app.screen.width / 2, app.screen.height / 2)
  app.stage.addChild(sun)
  const planet1 = new Planet(app.screen.width / 2, app.screen.height / 2, 100)
  app.stage.addChild(planet1)
  const planet2 = new Planet(app.screen.width / 2, app.screen.height / 2, 150)
  app.stage.addChild(planet2)

  app.ticker.add((delta) => {
    planet1.revolve()
  })
  app.ticker.add((delta) => {
    planet2.revolve()
  })
})
</script>
