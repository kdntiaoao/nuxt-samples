<template>
  <div class="wrap">
    <div class="mt20">
      <p class="title">落ちるオブジェクトの量</p>
      <label class="field-radio">
        <input type="radio" v-model="amount" value="small" />
        small
      </label>
      <label class="field-radio">
        <input type="radio" v-model="amount" value="medium" />
        medium
      </label>
      <label class="field-radio">
        <input type="radio" v-model="amount" value="large" />
        large
      </label>
    </div>
    <div class="mt20">
      <p class="title">落ちる速度</p>
      <label class="field-radio">
        <input type="radio" v-model="speed" value="slow" />
        slow
      </label>
      <label class="field-radio">
        <input type="radio" v-model="speed" value="medium" />
        medium
      </label>
      <label class="field-radio">
        <input type="radio" v-model="speed" value="fast" />
        fast
      </label>
    </div>
    <div class="mt20">
      <p class="title">オブジェクトの大きさ</p>
      <label class="field-radio">
        <input type="radio" v-model="size" value="small" />
        small
      </label>
      <label class="field-radio">
        <input type="radio" v-model="size" value="medium" />
        medium
      </label>
      <label class="field-radio">
        <input type="radio" v-model="size" value="large" />
        large
      </label>
    </div>
    <div class="mt20">
      <p class="title">オブジェクトの形</p>
      <label class="field-radio">
        <input type="radio" v-model="shape" value="circle" />
        circle
      </label>
      <label class="field-radio">
        <input type="radio" v-model="shape" value="square" />
        square
      </label>
      <label class="field-radio">
        <input type="radio" v-model="shape" value="triangle" />
        triangle
      </label>
      <label class="field-radio">
        <input type="radio" v-model="shape" value="random" />
        random
      </label>
    </div>
    <FallingObjects :amount="amount" :speed="speed" :size="size" :shape="shape" />
  </div>
</template>

<script setup lang="ts">
import FallingObjects from '~~/components/pixi/FallingObjects.vue'

type Amount = 'small' | 'medium' | 'large'
type Speed = 'slow' | 'medium' | 'fast'
type Size = 'small' | 'medium' | 'large'
type Shape = 'circle' | 'square' | 'triangle' | 'random'

const amount = ref<Amount>('medium')
const speed = ref<Speed>('medium')
const size = ref<Size>('medium')
const shape = ref<Shape>('circle')
</script>

<style scoped>
.wrap {
  padding: 1rem;
}

.title {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}

.field-radio {
  border: 1px solid #acf;
  padding: 0.5rem 0.8rem 0.5rem 0.6rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
}
.field-radio:has(*:checked) {
  background-color: #acf;
}

.mt20 {
  margin-top: 20px;
}
</style>
