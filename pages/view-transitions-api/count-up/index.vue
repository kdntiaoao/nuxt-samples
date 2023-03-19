<script setup>
import { ref, nextTick } from 'vue';
import { transitionHelper } from '@/utils/transitionHelper';

const count = ref(0);

function incrementClick() {
  transitionHelper({
    async updateDOM() {
      count.value++;
      await nextTick();
    },
  });
}
</script>

<template>
  <button type="button" @click="incrementClick">Increment</button>
  <div class="count">{{ count }}</div>
</template>

<style>
.count {
  text-align: center;
  position: absolute;
  inset: 50% 0 auto;
  transform: translateY(-50%);
  font-size: 25vw;
  view-transition-name: count;
}

/* Custom transition */
@keyframes rotate-out {
  to {
    transform: rotate(90deg);
    opacity: 0;
  }
}

@keyframes rotate-in {
  from {
    transform: rotate(-90deg);
    opacity: 0;
  }
}

html::view-transition-old(count),
html::view-transition-new(count) {
  animation-duration: 200ms;
  animation-name: rotate-in;
}

html::view-transition-old(count) {
  animation-name: rotate-out;
}
</style>
