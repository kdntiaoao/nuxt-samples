<template>
  <div>
    <button
      v-if="!isPressDone"
      type="button"
      class="btn"
      :style="`--progress: ${progress}`"
      @touchstart="handleTouchstart"
      @mousedown="handleTouchstart"
      @mouseleave="handleTouchend"
      @touchend="handleTouchend"
      @mouseup="handleTouchend"
    >
      <span class="btn-text">press...</span>
    </button>
    <p v-else>pressed!!</p>
    <p v-if="isShowInfo">長押ししてください</p>
    <p>{{ { pressedDuration } }}</p>
  </div>
</template>

<script setup lang="ts">
const REQUIRED_PRESS_DURATION = 1000;
const INTERVAL = 50;

const pressedDuration = ref<number>(0);
const timeId = ref<number>(0);
const isPressDone = ref<boolean>(false);
const isShowInfo = ref<boolean>(false);

const progress = computed<number>(() => {
  if (pressedDuration.value < 0) return 0;
  if (pressedDuration.value > REQUIRED_PRESS_DURATION) return 1;
  return pressedDuration.value / REQUIRED_PRESS_DURATION;
});

const countUp = () => {
  timeId.value = window.setTimeout(() => {
    pressedDuration.value += INTERVAL;
    if (pressedDuration.value < REQUIRED_PRESS_DURATION) countUp();
  }, INTERVAL);
};

const handleTouchstart = (ev: MouseEvent | TouchEvent) => {
  pressedDuration.value = 0;
  countUp();
};

const handleTouchend = () => {
  console.log('touchend');
  window.clearTimeout(timeId.value);
  if (progress.value < 1) {
    pressedDuration.value = 0;
    isShowInfo.value = true;
  } else {
    isPressDone.value = true;
    isShowInfo.value = false;
  }
};
</script>

<style scoped>
.btn {
  border: 0.3rem solid #000;
  font-size: 2rem;
  transition: background-image 3s;
  display: block;
  padding: 0;
  user-select: none;
  margin: 0;
  background-image: linear-gradient(
    90deg,
    #000 0 calc(var(--progress) * 100%),
    #fff calc(var(--progress) * 100%) 100%
  );
}

.btn-text {
  background: inherit;
  background-clip: text;
  color: transparent;
  filter: invert(1) grayscale(1) contrast(9);
  width: 14rem;
  height: 3rem;
  padding-bottom: 0.3rem;
  display: grid;
  place-content: center;
}
</style>
