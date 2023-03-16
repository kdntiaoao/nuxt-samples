<template>
  <div>
    <button
      v-if="!isSwipeDone"
      type="button"
      class="btn"
      @mousedown="handleTouchstart"
      @touchstart="handleTouchstart"
      @touchend="handleTouchend"
      :style="`--progress: ${progress}`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="btn-arrow"
        :class="{ 'is-animation': isAnimation }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>

      swipe
    </button>
    <p v-else>Swiped!!</p>
    <p v-if="isShowInfo">スワイプしてください</p>
    <div v-show="isShowBg" class="bg-full" @mouseup="handleTouchend"></div>
    <!-- <p>{{ { isShowBg, isShowInfo, isSwipeDone, distance, progress } }}</p> -->
  </div>
</template>

<script setup lang="ts">
const REQUIRED_DISTANCE = 200;

const isShowBg = ref(false);
const isShowInfo = ref(false);
const isSwipeDone = ref(false);
const startPosition = ref<number | null>(null);
const currentPosition = ref<number | null>(null);
const isAnimation = ref<boolean>(true);

const distance = computed(() => {
  if (currentPosition.value === null || startPosition.value === null) return 0;
  return currentPosition.value - startPosition.value > 0
    ? currentPosition.value - startPosition.value
    : 0;
});

const progress = computed(() => {
  return distance.value / REQUIRED_DISTANCE < 1
    ? distance.value / REQUIRED_DISTANCE
    : 1;
});

const onCursorMove = (ev: MouseEvent | TouchEvent) => {
  console.log('moved');
  if (ev instanceof TouchEvent) {
    currentPosition.value = ev.touches[0].clientX;
  } else {
    currentPosition.value = ev.clientX;
  }
};

const handleTouchstart = (ev: MouseEvent | TouchEvent) => {
  isAnimation.value = false;
  if (ev instanceof TouchEvent) {
    startPosition.value = ev.touches[0].clientX;
    window.ontouchmove = onCursorMove;
  } else {
    isShowBg.value = true;
    startPosition.value = ev.clientX;
    window.onmousemove = onCursorMove;
  }
};

const handleTouchend = () => {
  isAnimation.value = true;
  isShowBg.value = false;
  window.ontouchmove = null;
  if (progress.value < 1) {
    window.onmousemove = null;
    currentPosition.value = 0;
    isShowInfo.value = true;
  } else {
    isSwipeDone.value = true;
    isShowInfo.value = false;
  }
};
</script>

<style scoped>
.btn {
  border: 0.3rem solid #f5f4bc;
  width: 16rem;
  height: 4rem;
  padding-top: 0.2rem;
  display: grid;
  place-content: center;
  font-size: 2rem;
  position: relative;
  transition: background-image 3s;
  color: #fff;
  user-select: none;
  background: linear-gradient(
    90deg,
    #f5a4a4,
    #f4a5b6,
    #efa8c8,
    #e4acd8,
    #d5b2e6,
    #c3b9f0,
    #b0c0f6,
    #9dc6f8,
    #8cccf5
  );
}
.btn:hover {
  cursor: pointer;
}
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: #222;
  scale: calc(1 - var(--progress)) 1;
  transform-origin: right center;
  mix-blend-mode: difference;
}

@keyframes shakeX {
  0%,
  20%,
  40%,
  100% {
    transform: translate3d(0, -50%, 0);
  }

  10%,
  30% {
    transform: translate3d(0.3rem, -50%, 0);
  }
}

@keyframes shakeXHover {
  0%,
  20%,
  40%,
  100% {
    transform: translate3d(0, -50%, 0);
  }

  10%,
  30% {
    transform: translate3d(0.4rem, -50%, 0);
  }
}

.btn-arrow {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translate3d(0, -50%, 0);
}
.btn:hover .btn-arrow,
.btn:hover .btn-arrow.is-animation {
  animation: 3s linear 0s shakeXHover;
}
.btn-arrow.is-animation {
  animation: 3s linear 2s infinite shakeX;
}

.bg-full {
  position: fixed;
  inset: 0;
  z-index: 1;
  user-select: none;
}
</style>
