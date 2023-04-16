<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'
import { Sun } from '@/sprites/Sun'
import { Planet } from '@/sprites/Planet'

let planetCount = 0

const canvasRef = ref<HTMLCanvasElement | null>(null)

const addPlanet = (app: PIXI.Application) => {
  planetCount++
  const planet = new Planet(app.screen.width / 2, app.screen.height / 2, 100 + planetCount * 50)
  app.stage.addChild(planet)

  app.ticker.add(() => {
    planet.revolve()
  })
}

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

  sun.on('pointertap', (ev: PIXI.FederatedPointerEvent) => {
    addPlanet(app)
  })

  addPlanet(app)
})
</script>
