<template>
  <div>
    <video class="video" ref="video"></video>
    <canvas ref="canvas"></canvas>
    <p ref="result"></p>
    <button type="button" @click="readImageText">読み取る</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createWorker } from 'tesseract.js';

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const result = ref<HTMLParagraphElement | null>(null);

const readImageText = async () => {
  const worker = await createWorker({
    logger: (m) => console.log({ m }),
  });

  (async () => {
    if (!canvas.value || !result.value) return;
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const {
      data: { text },
    } = await worker.recognize(canvas.value.toDataURL());
    console.log(text);
    result.value.textContent = text;
    await worker.terminate();
  })();
};

if (process.client) {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: 'environment',
      },
      audio: false,
    })
    .then((stream) => {
      if (!video.value || !canvas.value) return;
      video.value.srcObject = stream;
      video.value.play();

      setInterval(() => {
        if (!video.value || !canvas.value) return;
        canvas.value.width = video.value.videoWidth;
        canvas.value.height = video.value.videoHeight;
        const ctx = canvas.value.getContext('2d');
        ctx?.drawImage(
          video.value,
          0,
          0,
          video.value.videoWidth,
          video.value.videoHeight,
          0,
          0,
          canvas.value.width,
          canvas.value.height
        );
      }, 200);
    })
    .catch((e) => {
      console.log('error!');
    });
}
</script>

<style scoped>
.video {
  object-fit: contain;
  object-position: center;
  max-width: 100%;
}
</style>
