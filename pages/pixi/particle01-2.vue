<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const CIRCLE_MAX_RADIUS = 8

let objCount = 0

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

  const renderedAreaSize = {
    x: { from: app.screen.width / 6, to: app.screen.width / 1.2 },
    y: { from: 0, to: app.screen.height },
    width: app.screen.width / 1.2 - app.screen.width / 6,
    height: app.screen.height,
  } as const

  const text = new PIXI.Text(objCount, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  text.x = 20
  text.y = app.screen.height - text.height - 20

  app.stage.addChild(text)

  const addCircle = (
    x: number,
    y: number,
    radius: number = 20,
    direction: number = -Math.PI / 2,
    velocity: number = 1,
    hue: number = 0
  ) => {
    const circle = new PIXI.Graphics().beginFill({ h: hue, s: 63, l: 80 }).drawCircle(x, y, radius)
    circle.zIndex = radius
    const blurFilter = new PIXI.BlurFilter(((CIRCLE_MAX_RADIUS * 0.7) / radius) ** 3)
    circle.filters = [blurFilter]
    app.stage.addChild(circle)
    objCount++
    text.text = objCount

    const animate = (time: number) => {
      circle.x += time * velocity * Math.cos(direction)
      circle.y -= time * velocity * Math.sin(direction)
      if (radius / CIRCLE_MAX_RADIUS < 0.8 && Math.random() < 0.8) {
        circle.alpha -= 0.005
      }
      if (
        x + circle.x < renderedAreaSize.x.from - CIRCLE_MAX_RADIUS / 2 ||
        x + circle.x > renderedAreaSize.x.to + CIRCLE_MAX_RADIUS / 2 ||
        y + circle.y < renderedAreaSize.y.from - CIRCLE_MAX_RADIUS / 2 ||
        y + circle.y > renderedAreaSize.y.to + CIRCLE_MAX_RADIUS / 2
      ) {
        app.stage.removeChild(circle)
        circle.destroy()
        app.ticker.remove(animate)
        objCount--
        text.text = objCount
      }
    }
    app.ticker.add(animate)
  }

  const addParticles = (ev: PIXI.FederatedPointerEvent) => {
    const radius = Math.random() * (CIRCLE_MAX_RADIUS / 2) + CIRCLE_MAX_RADIUS / 2
    const direction = -Math.PI / 2 + (Math.random() - 0.5) / 2
    const velocity = (radius / CIRCLE_MAX_RADIUS) * 1.2
    const hue = Math.random() * 365
    addCircle(ev.screenX, ev.screenY, radius, direction, velocity, hue)
  }

  const renderedArea = new PIXI.Graphics()
    .beginFill(0x444444)
    .drawRect(renderedAreaSize.x.from, renderedAreaSize.y.from, renderedAreaSize.width, renderedAreaSize.height)

  renderedArea.eventMode = 'static'
  renderedArea.on('pointertap', addParticles)

  app.stage.addChild(renderedArea)

  let startTime: number | null
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp

    const elapsed = timestamp - startTime

    if (elapsed > 400) {
      const radius = Math.random() * (CIRCLE_MAX_RADIUS / 2) + CIRCLE_MAX_RADIUS / 2
      const x = Math.random() * (renderedAreaSize.width - radius * 2) + renderedAreaSize.x.from + radius
      const direction = -Math.PI / 2 + (Math.random() - 0.5) / 2
      const velocity = (radius / CIRCLE_MAX_RADIUS) * 1.2
      const hue = Math.random() * 365
      addCircle(x, -radius / 2, radius, direction, velocity, hue)

      startTime = null
    }

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
})
</script>
