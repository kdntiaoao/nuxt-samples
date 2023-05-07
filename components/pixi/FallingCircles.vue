<template>
  <div class="falling-circles">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

type Amount = 'small' | 'medium' | 'large'
type Speed = 'slow' | 'medium' | 'fast'
type Size = 'small' | 'medium' | 'large'
type Props = {
  amount: Amount
  speed: Speed
  size: Size
}

const props = withDefaults(defineProps<Props>(), {
  amount: 'medium',
  speed: 'medium',
  size: 'medium',
})

const fallingDurationList = {
  small: 1500,
  medium: 600,
  large: 100,
} as const
const fallingVelocityList = {
  slow: 0.2,
  medium: 1.2,
  fast: 5,
} as const
const maxSizeList = {
  small: 10,
  medium: 20,
  large: 40,
} as const
const minSizeList = {
  small: maxSizeList.small / 3,
  medium: maxSizeList.medium / 2,
  large: maxSizeList.large / 2,
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

  const addCircle = (x: number, y: number, size: number = 20, direction: number = -Math.PI / 2, hue: number = 0) => {
    const circle = new PIXI.Graphics().beginFill({ h: hue, s: 63, l: 80 }).drawCircle(x, y, size / 2)
    circle.zIndex = size
    const ratio = (maxSizeList[props.size] - size) / maxSizeList[props.size]
    const blurFilter = new PIXI.BlurFilter(ratio * 10)
    circle.filters = [blurFilter]
    circle.zIndex = 1 / ratio
    container.addChild(circle)
    objCount++
    text.text = objCount

    const animate = (time: number) => {
      const velocity = (size / maxSizeList[props.size]) * fallingVelocityList[props.speed]
      circle.x += time * velocity * Math.cos(direction)
      circle.y -= time * velocity * Math.sin(direction)
      if (
        x + circle.x < renderedAreaSize.x.from - maxSizeList[props.size] ||
        x + circle.x > renderedAreaSize.x.to + maxSizeList[props.size] ||
        y + circle.y < renderedAreaSize.y.from - maxSizeList[props.size] ||
        y + circle.y > renderedAreaSize.y.to + maxSizeList[props.size]
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

    if (elapsed > fallingDurationList[props.amount]) {
      const size = Math.random() * (maxSizeList[props.size] - minSizeList[props.size]) + minSizeList[props.size]
      const x = Math.random() * (renderedAreaSize.width - size * 2) + renderedAreaSize.x.from + size
      const direction = -Math.PI / 2 + (Math.random() - 0.5) / 2
      const hue = Math.random() * 365

      addCircle(x, -size / 2, size, direction, hue)

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
