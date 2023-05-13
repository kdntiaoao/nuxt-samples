<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const G = 9.80665 * 2 // 重力を強くしている
const CIRCLES_PER_CLICK = 100
const CIRCLE_MIN_RADIUS = 8
const CIRCLE_MAX_RADIUS = 8
const CIRCLE_MIN_V = 40
const CIRCLE_MAX_V = 120

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

  const container = new PIXI.Container()
  container.sortableChildren = true
  app.stage.addChild(container)

  const renderedAreaSize = {
    x: { from: 0, to: app.screen.width },
    y: { from: 0, to: app.screen.height },
    width: app.screen.width,
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
  text.zIndex = 100
  container.addChild(text)

  const addAfterimage = (x: number, y: number, radius: number) => {
    const circle = new PIXI.Graphics().beginFill(0x999999).drawCircle(x, y, radius)
    circle.alpha = 0.4
    container.addChild(circle)

    const animate = () => {
      if (circle.alpha <= 0) {
        app.stage.removeChild(circle)
        circle.destroy()
        app.ticker.remove(animate)
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
    objCount++
    text.text = objCount

    let elapsed = 0
    let ax = 0
    let ay = G
    let az = 0
    let vx = iniV * Math.cos(direction)
    let vy = -(iniV * Math.sin(direction))
    let vz = iniV * Math.cos(zDirection)
    const animate = (time: number) => {
      // addAfterimage(circle.x, circle.y, circle.width / 2)
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
        console.log(easeInCubic(elapsed - blurStart))
      }

      if (
        circle.x < renderedAreaSize.x.from ||
        circle.x > renderedAreaSize.x.to ||
        circle.y < renderedAreaSize.y.from ||
        circle.y > renderedAreaSize.y.to
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

  const onTap = (ev: PIXI.FederatedPointerEvent) => {
    const iniX = ev.screenX
    const iniY = ev.screenY
    const tilt = Math.random()

    for (let i = 0; i < CIRCLES_PER_CLICK; i++) {
      const radius = Math.random() * (CIRCLE_MAX_RADIUS - CIRCLE_MIN_RADIUS) + CIRCLE_MIN_RADIUS
      const iniV = (i / (CIRCLES_PER_CLICK - 1)) * (CIRCLE_MAX_V - CIRCLE_MIN_V) + CIRCLE_MIN_V
      const direction = (Math.PI * i) / ((CIRCLES_PER_CLICK - 1) / 2) + tilt
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
