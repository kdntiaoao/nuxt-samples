<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const G = 9.80665 * 2 // 重力を強くしている
const CIRCLES_PER_CLICK = 138
const CIRCLE_MIN_RADIUS = 6
const CIRCLE_MAX_RADIUS = 6
const CIRCLE_MIN_V = 60
const CIRCLE_MAX_V = 120

let circleCount = 0
let totalCount = 0

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

  const container = new PIXI.Container()
  container.sortableChildren = true
  app.stage.addChild(container)

  const renderedAreaSize = {
    x: { from: 0, to: app.screen.width },
    y: { from: 0, to: app.screen.height },
    width: app.screen.width,
    height: app.screen.height,
  } as const

  const totalLabelText = new PIXI.Text('total:', {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  totalLabelText.x = 20
  totalLabelText.y = app.screen.height - totalLabelText.height - 20
  totalLabelText.zIndex = 100
  container.addChild(totalLabelText)

  const totalCountText = new PIXI.Text(totalCount, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  totalCountText.x = totalLabelText.x + totalLabelText.width + 4
  totalCountText.y = totalLabelText.y
  totalCountText.zIndex = 100
  container.addChild(totalCountText)

  const circleLabelText = new PIXI.Text('circle:', {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  circleLabelText.x = 20
  circleLabelText.y = totalLabelText.y - totalLabelText.height
  circleLabelText.zIndex = 100
  container.addChild(circleLabelText)

  const circleCountText = new PIXI.Text(circleCount, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  circleCountText.x = circleLabelText.x + circleLabelText.width + 4
  circleCountText.y = circleLabelText.y
  circleCountText.zIndex = 100
  container.addChild(circleCountText)

  const addAfterimage = (x: number, y: number, radius: number) => {
    const circle = new PIXI.Graphics().beginFill(0x999999).drawCircle(x, y, radius)
    circle.alpha = 0.4
    container.addChild(circle)
    totalCount++
    totalCountText.text = totalCount

    const animate = () => {
      if (circle.alpha <= 0) {
        app.stage.removeChild(circle)
        circle.destroy()
        app.ticker.remove(animate)
        totalCount--
        totalCountText.text = totalCount
      } else {
        circle.alpha -= 0.005
      }
    }
    app.ticker.add(animate)
  }

  const addCircle = (
    iniX: number,
    iniY: number,
    radius: number,
    iniV: number,
    direction: number,
    zDirection: number
  ) => {
    const circle = new PIXI.Graphics().beginFill({ h: 40, s: 63, l: 80 }).drawCircle(0, 0, radius).endFill()
    circle.zIndex = 10
    circle.x = iniX
    circle.y = iniY
    container.addChild(circle)
    circleCount++
    circleCountText.text = circleCount
    totalCount++
    totalCountText.text = totalCount

    let elapsed = 0
    let ax = 0
    let ay = G
    let az = 0
    let vx = iniV * Math.cos(direction)
    let vy = -(iniV * Math.sin(direction))
    let vz = iniV * Math.cos(zDirection)
    const animate = (time: number) => {
      addAfterimage(circle.x, circle.y, circle.width / 2)
      elapsed += time / 60
      vx += ax * (time / 60) * 2
      vy += ay * (time / 60) * 2
      vz += az * (time / 60) * 2
      circle.x += vx * (time / 60) * 2
      circle.y += vy * (time / 60) * 2
      circle.scale.x += (vz * (time / 60) * 2) / 400
      circle.scale.y += (vz * (time / 60) * 2) / 400

      const blurStart = 1.5
      if (elapsed > blurStart) {
        circle.alpha -= 0.05 * easeInCubic(elapsed - blurStart)
      }

      if (
        circle.x < renderedAreaSize.x.from ||
        circle.x > renderedAreaSize.x.to ||
        circle.y < renderedAreaSize.y.from ||
        circle.y > renderedAreaSize.y.to ||
        circle.alpha <= 0
      ) {
        app.stage.removeChild(circle)
        circle.destroy()
        app.ticker.remove(animate)
        circleCount--
        circleCountText.text = circleCount
        totalCount--
        totalCountText.text = totalCount
      }
    }
    app.ticker.add(animate)
  }

  const onTap = (ev: PIXI.FederatedPointerEvent) => {
    const iniX = ev.screenX
    const tilt = Math.random()
    const directionCount = 6

    for (let i = 0; i < CIRCLES_PER_CLICK; i++) {
      const iniVCoeff = Math.round(Math.random() * 2)
      const iniY = ev.screenY
      const radius = Math.random() * (CIRCLE_MAX_RADIUS - CIRCLE_MIN_RADIUS) + CIRCLE_MIN_RADIUS
      const iniV =
        ((((i / directionCount) * 10) | 0) / CIRCLES_PER_CLICK) * (CIRCLE_MAX_V - CIRCLE_MIN_V) + CIRCLE_MIN_V
      // const direction = (Math.PI * i) / ((CIRCLES_PER_CLICK - 1) / 2) + tilt
      const direction =
        (Math.PI * (i % directionCount)) / (directionCount / 2) + tilt * (((i / directionCount) * 10) | 0)
      const zDirection = Math.random() * (Math.PI / 2)
      addCircle(iniX, iniY, radius, iniV, direction, zDirection)
    }
  }

  const renderedArea = new PIXI.Graphics()
    .beginFill(0x444444)
    .drawRect(renderedAreaSize.x.from, renderedAreaSize.y.from, renderedAreaSize.width, renderedAreaSize.height)

  renderedArea.eventMode = 'static'
  renderedArea.on('pointertap', onTap)

  container.addChild(renderedArea)
})
</script>
