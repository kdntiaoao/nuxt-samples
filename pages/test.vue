<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js'

let objCount = 0

const canvasRef = ref<HTMLCanvasElement | null>(null)

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

  const object1 = new PIXI.Graphics()
    .beginFill({ h: 30, s: 63, l: 80 })
    .drawRect(app.screen.width / 2 - 50, app.screen.height / 2 - 50, 100, 100)
    .endFill()
  object1.alpha = 0.2
  container.addChild(object1)

  const size = 100
  const triangleHeight = (Math.sqrt(3) / 2) * size
  const object = new PIXI.Graphics()
    .beginFill({ h: 40, s: 63, l: 80 })
    .drawPolygon([size / 2, 0, 0, triangleHeight, size, triangleHeight])
    .endFill()
  object.pivot.set(object.width / 2, object.height / 2)
  object.x = app.screen.width / 2
  object.y = app.screen.height / 2
  container.addChild(object)
  console.log(object.width, object.height)
})
</script>

<style scoped>
.falling-circles {
  position: fixed;
  inset: 0;
  pointer-events: none;
}
</style>
