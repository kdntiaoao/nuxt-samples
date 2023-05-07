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
    <FallingCircles :amount="amount" :speed="speed" :size="size" />
  </div>
</template>

<script setup lang="ts">
import FallingCircles from '~~/components/pixi/FallingCircles.vue'

type Amount = 'small' | 'medium' | 'large'
type Speed = 'slow' | 'medium' | 'fast'
type Size = 'small' | 'medium' | 'large'

const amount = ref<Amount>('medium')
const speed = ref<Speed>('medium')
const size = ref<Size>('medium')
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
