<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const G = 9.80665 * 2 // 重力を強くしている
const CIRCLES_PER_CLICK = 123
const CIRCLE_MIN_RADIUS = 5
const CIRCLE_MAX_RADIUS = 6
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

  const addAfterimage = (x: number, y: number, radius: number, hue: number) => {
    const circle = new PIXI.Graphics().beginFill({ h: hue, s: 20, l: 70 }).drawCircle(x, y, radius)
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
        circle.alpha -= 0.01
      }
    }
    app.ticker.add(animate)
  }

  const addCircle = (
    iniX: number,
    iniY: number,
    radius: number,
    hue: number,
    iniV: number,
    direction: number,
    zDirection: number
  ) => {
    const circle = new PIXI.Graphics().beginFill({ h: hue, s: 63, l: 80 }).drawCircle(0, 0, radius).endFill()
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
      addAfterimage(circle.x, circle.y, circle.width / 2, hue)
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
    const iniY = ev.screenY
    let extraCircles = CIRCLES_PER_CLICK
    let layerCount = 0
    const tiltBase = 2 * Math.PI * Math.random()
    const hueBase = 360 * Math.random()

    while (extraCircles > 0) {
      layerCount++
      const circleCount = extraCircles > 8 ? (extraCircles / 2) | 0 : extraCircles
      extraCircles -= circleCount
      const tilt = Math.PI * (layerCount % 2) + tiltBase
      for (let i = 1; i <= circleCount; i++) {
        const radius = Math.random() * (CIRCLE_MAX_RADIUS - CIRCLE_MIN_RADIUS) + CIRCLE_MIN_RADIUS
        const direction = 2 * Math.PI * (i / circleCount) + tilt
        const hue = (direction / (2 * Math.PI)) * 360 + hueBase
        const iniV = CIRCLE_MAX_V * (5 / 6) ** (layerCount - 1) * (Math.random() * 0.01 + 0.99)
        const zDirection = Math.random() * (Math.PI / 2)
        addCircle(iniX, iniY, radius, hue, iniV, direction, zDirection)
      }
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
