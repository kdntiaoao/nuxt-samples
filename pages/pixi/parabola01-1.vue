<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvasRef.value) return

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    view: canvasRef.value,
    backgroundColor: '#555',
  })

  const addCircle = (
    iniX: number,
    iniY: number,
    velocity: number,
    direction: number,
    rawT: number,
    hue: number,
    lightness: number = 80
  ) => {
    const g = 9.80665
    const circleRadius = 10
    const t = rawT * 0.8
    const circleX = iniX + velocity * Math.cos(direction) * t
    const circleY = iniY - (velocity * Math.sin(direction) * t - (1 / 2) * g * t ** 2)
    const circle = new PIXI.Graphics()
      .beginFill({ h: hue, s: 63, l: lightness })
      .drawCircle(circleX, circleY, circleRadius)
    app.stage.addChild(circle)

    const text = new PIXI.Text(rawT, {
      fontFamily: 'Arial',
      fontSize: 16,
      fill: 0x333333,
      align: 'center',
    })
    text.x = circleX - text.width / 2
    text.y = circleY - text.height / 2

    app.stage.addChild(text)
  }

  for (let i = 0; i < 20; i++) {
    const iniX = 20
    const iniY = app.screen.height - 40
    const velocity = 120
    const direction = Math.PI / 2
    const hue = i * 30
    addCircle(iniX, iniY, velocity, direction, i, hue)
  }

  for (let i = 0; i < 20; i++) {
    const iniX = 20
    const iniY = app.screen.height - 40
    const velocity = 120
    const direction = Math.PI / 3
    const hue = i * 30
    const lightness = 60
    addCircle(iniX, iniY, velocity, direction, i, hue, lightness)
  }

  for (let i = 0; i < 20; i++) {
    const iniX = 20
    const iniY = app.screen.height - 40
    const velocity = 120
    const direction = Math.PI / 4
    const hue = i * 30
    const lightness = 40
    addCircle(iniX, iniY, velocity, direction, i, hue, lightness)
  }

  for (let i = 0; i < 20; i++) {
    const iniX = 20
    const iniY = app.screen.height - 40
    const velocity = 120
    const direction = Math.PI / 6
    const hue = i * 30
    const lightness = 20
    addCircle(iniX, iniY, velocity, direction, i, hue, lightness)
  }
})
</script>
