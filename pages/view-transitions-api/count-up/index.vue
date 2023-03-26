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
</style>
