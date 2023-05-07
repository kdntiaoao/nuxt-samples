<template>
  <div class="falling-circles">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

type Amount = 'small' | 'medium' | 'large'
type Speed = 'slow' | 'medium' | 'fast'
type Props = {
  amount: Amount
  speed: Speed
}

const props = withDefaults(defineProps<Props>(), {
  amount: 'medium',
  speed: 'medium',
})

const CIRCLE_MAX_RADIUS = 8
const fallingDuration = {
  small: 1500,
  medium: 600,
  large: 100,
} as const
const fallingVelocity = {
  slow: 0.2,
  medium: 1.2,
  fast: 5,
} as const

let objCount = 0

const canvasRef = ref<HTMLCanvasElement | null>(null)

const xFrom = 0
const xTo = 1
const yFrom = 0
const yTo = 1

onMounted(() => {
  if (!canvasRef.value) return

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    view: canvasRef.value,
    backgroundColor: '#000',
    backgroundAlpha: 0,
  })

  const container = new PIXI.Container()
  container.sortableChildren = true
  app.stage.addChild(container)

  const renderedAreaSize = {
    x: { from: app.screen.width * xFrom, to: app.screen.width * xTo },
    y: { from: app.screen.height * yFrom, to: app.screen.height * yTo },
    width: app.screen.width * xTo - app.screen.width * xFrom,
    height: app.screen.width * yTo - app.screen.width * yFrom,
  } as const

  const text = new PIXI.Text(objCount, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  text.x = 20
  text.y = app.screen.height - text.height - 20
  text.zIndex = 10
  container.addChild(text)

  const addCircle = (x: number, y: number, radius: number = 20, direction: number = -Math.PI / 2, hue: number = 0) => {
    const circle = new PIXI.Graphics().beginFill({ h: hue, s: 63, l: 80 }).drawCircle(x, y, radius)
    circle.zIndex = radius
    const blurFilter = new PIXI.BlurFilter(((CIRCLE_MAX_RADIUS * 0.7) / radius) ** 3)
    circle.filters = [blurFilter]
    container.addChild(circle)
    objCount++
    text.text = objCount

    const animate = (time: number) => {
      const velocity = (radius / CIRCLE_MAX_RADIUS) * fallingVelocity[props.speed]
      circle.x += time * velocity * Math.cos(direction)
      circle.y -= time * velocity * Math.sin(direction)
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

  let startTime: number | null
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp

    const elapsed = timestamp - startTime

    if (elapsed > fallingDuration[props.amount]) {
      const radius = Math.random() * (CIRCLE_MAX_RADIUS / 2) + CIRCLE_MAX_RADIUS / 2
      const x = Math.random() * (renderedAreaSize.width - radius * 2) + renderedAreaSize.x.from + radius
      const direction = -Math.PI / 2 + (Math.random() - 0.5) / 2
      const hue = Math.random() * 365

      addCircle(x, -radius / 2, radius, direction, hue)

      startTime = null
    }

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
})
</script>

<style scoped>
.falling-circles {
  position: fixed;
  inset: 0;
  pointer-events: none;
}
</style>
