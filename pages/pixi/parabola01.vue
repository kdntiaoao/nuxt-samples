<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const G = 9.80665

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
    x: { from: 0, to: app.screen.width },
    y: { from: 0, to: app.screen.height },
    width: app.screen.width,
    height: app.screen.height,
  } as const

  const addCircle = (iniX: number, iniY: number, velocity: number, direction: number) => {
    const circleRadius = 10
    const circle = new PIXI.Graphics().beginFill({ h: 40, s: 63, l: 80 }).drawCircle(iniX, iniY, circleRadius)
    app.stage.addChild(circle)
    objCount++
    text.text = objCount

    let t = 0
    const animate = (time: number) => {
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
    addCircle(iniX, iniY, velocity, Math.PI / 3)
    addCircle(iniX, iniY, velocity, Math.PI / 4)
    addCircle(iniX, iniY, velocity, Math.PI / 6)
  }

  const renderedArea = new PIXI.Graphics()
    .beginFill(0x444444)
    .drawRect(renderedAreaSize.x.from, renderedAreaSize.y.from, renderedAreaSize.width, renderedAreaSize.height)

  renderedArea.eventMode = 'static'
  renderedArea.on('pointertap', onTap)

  app.stage.addChild(renderedArea)

  const text = new PIXI.Text(objCount, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  text.x = 20
  text.y = app.screen.height - text.height - 20
  text.zIndex = 100
  app.stage.addChild(text)
})
</script>
