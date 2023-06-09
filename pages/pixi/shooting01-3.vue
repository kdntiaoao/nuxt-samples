<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

const CIRCLES_PER_CLICK = 8

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

  const text = new PIXI.Text(objCount, {
    fontFamily: 'Arial',
    fontSize: 32,
    fill: 0xcccccc,
    align: 'center',
  })
  text.x = 20
  text.y = app.screen.height - text.height - 20

  app.stage.addChild(text)

  const addCircle = (x: number, y: number, direction: number = 0, hue: number = 0) => {
    const circle = new PIXI.Graphics().beginFill({ h: hue, s: 63, l: 80 }).drawCircle(x, y, 10)
    app.stage.addChild(circle)
    const animate = (time: number) => {
      circle.x += time * 3 * Math.cos(direction)
      circle.y -= time * 3 * Math.sin(direction)
      if (
        x + circle.x <= app.screen.width / 6 ||
        x + circle.x >= app.screen.width / 1.2 ||
        y + circle.y <= 0 ||
        y + circle.y >= app.screen.height
      ) {
        circle.destroy()
        app.ticker.remove(animate)
        objCount--
        text.text = objCount
      }
    }
    app.ticker.add(animate)
    objCount++
    text.text = objCount
  }

  const fullRect = new PIXI.Graphics()
    .beginFill(0x444444)
    .drawRect(app.screen.width / 6, 0, app.screen.width / 1.5, app.screen.height)

  fullRect.eventMode = 'static'
  fullRect.on('pointertap', (ev) => {
    const random = (Math.random() * 365) | 0
    for (let i = 0; i < CIRCLES_PER_CLICK * 2; i++) {
      addCircle(ev.screenX, ev.screenY, (Math.PI * i) / CIRCLES_PER_CLICK, random)
    }
  })

  app.stage.addChild(fullRect)
})
</script>
