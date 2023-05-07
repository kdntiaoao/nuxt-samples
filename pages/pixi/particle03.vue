<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const G = 9.80665 * 10 // 重力を強くしている
const CIRCLES_PER_CLICK = 20

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
  text.zIndex = 100
  container.addChild(text)

  const addAfterimage = (x: number, y: number) => {
    const circleRadius = 10
    const circle = new PIXI.Graphics().beginFill(0x999999).drawCircle(x, y, circleRadius)
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

  const addCircle = (iniX: number, iniY: number, velocity: number, direction: number) => {
    const circleRadius = 10
    const circle = new PIXI.Graphics().beginFill({ h: 40, s: 63, l: 80 }).drawCircle(iniX, iniY, circleRadius)
    circle.zIndex = 10
    container.addChild(circle)
    objCount++
    text.text = objCount

    let t = 0
    const animate = (time: number) => {
      addAfterimage(iniX + circle.x, iniY + circle.y)
      t += (time / 60) * 2
      circle.x = velocity * Math.cos(direction) * t
      circle.y = -(velocity * Math.sin(direction) * t - (1 / 2) * G * t ** 2)

      if (
        iniX + circle.x < renderedAreaSize.x.from ||
        iniX + circle.x > renderedAreaSize.x.to ||
        iniY + circle.y < renderedAreaSize.y.from ||
        iniY + circle.y > renderedAreaSize.y.to
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
    const velocity = 120

    for (let i = 0; i < CIRCLES_PER_CLICK; i++) {
      addCircle(iniX, iniY, velocity, (Math.PI * i) / ((CIRCLES_PER_CLICK - 1) / 2))
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
