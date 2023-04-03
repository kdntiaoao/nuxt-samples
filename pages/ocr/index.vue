<template>
  <div class="wrap">
    <button v-if="!isActiveCamera" type="button" @click="startCamera">
      カメラ起動
    </button>
    <div v-else>
      <video width="300" height="200" class="video" ref="video"></video>
      <div class="img-box">
        <canvas class="canvas" ref="canvasFull"></canvas>
      </div>
      <p ref="result"></p>
      <button type="button" @click="readImageText">読み取る</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createWorker } from 'tesseract.js';

const VIEW_WIDTH = 300;
const ASPECT_RATIO = 7;
const VIEW_HEIGHT = VIEW_WIDTH / ASPECT_RATIO;

const isActiveCamera = ref<boolean>(false);
const video = ref<HTMLVideoElement | null>(null);
const canvasFull = ref<HTMLCanvasElement | null>(null);
const canvasView = ref<HTMLCanvasElement | null>(null);
const result = ref<HTMLParagraphElement | null>(null);

const startCamera = () => {
  if (process.client) {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
        },
        audio: false,
      })
      .then((stream) => {
        if (!video.value || !canvasFull.value) return;
        video.value.srcObject = stream;
        video.value.play();

        setInterval(() => {
          if (!video.value || !canvasFull.value) return;

          canvasFull.value.width = VIEW_WIDTH + 50;
          canvasFull.value.height =
            (canvasFull.value.width * video.value.videoHeight) /
            video.value.videoWidth;

          const ctx = canvasFull.value.getContext('2d');

          if (!ctx) return;

          ctx.drawImage(
            video.value,
            0,
            0,
            video.value.videoWidth,
            video.value.videoHeight,
            0,
            0,
            canvasFull.value.width,
            canvasFull.value.height
          );

          const viewRange = {
            x: (canvasFull.value.width - VIEW_WIDTH) / 2,
            y: (canvasFull.value.height - VIEW_HEIGHT) / 2,
            w: VIEW_WIDTH,
            h: VIEW_HEIGHT,
          };

          ctx.beginPath();
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 2;
          ctx.rect(viewRange.x, viewRange.y, viewRange.w, viewRange.h);
          ctx.stroke();

          canvasView.value = document.createElement('canvas');
          canvasView.value.width = VIEW_WIDTH;
          canvasView.value.height = VIEW_HEIGHT;
          canvasView.value
            .getContext('2d')
            ?.drawImage(
              canvasFull.value,
              viewRange.x,
              viewRange.y,
              viewRange.w,
              viewRange.h,
              0,
              0,
              viewRange.w,
              viewRange.h
            );
        }, 200);
      })
      .catch((e) => {
        console.log('error!');
      });
    isActiveCamera.value = true;
  }
};

const readImageText = async () => {
  const worker = await createWorker({
    logger: (m) => console.log({ m }),
  });

  (async () => {
    if (!canvasView.value || !result.value) return;
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789',
    });
    const {
      data: { text },
    } = await worker.recognize(canvasView.value.toDataURL());
    console.log(text);
    result.value.textContent = text;
    await worker.terminate();
  })();
};
</script>

<style scoped>
.wrap {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}

.video {
  object-fit: cover;
  object-position: center;
  display: none;
}

.img-box {
  outline: green;
}

.canvas {
  outline: red;
}
</style>
