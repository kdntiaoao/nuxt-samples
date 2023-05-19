<template>
  <div>
    <Polygon :width="300" :height="300" />
    <Polygon :width="400" :height="400" />
  </div>
  <div>
    <Polygon :width="200" :height="200" :apexes-count="3" />
    <Polygon :width="200" :height="200" :apexes-count="4" />
    <Polygon :width="200" :height="200" :apexes-count="5" />
  </div>
</template>

<script setup lang="ts">
import Polygon from '~/components/pixi/Polygon.vue'
</script>

<style scoped>
canvas {
  outline: 1px solid red;
}
</style>
