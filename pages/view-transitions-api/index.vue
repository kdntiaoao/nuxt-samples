<template>
  <div>
    <h1>View Transitions API</h1>
    <ul class="gallery-grid">
      <li class="gallery-item">
        <NuxtLink
          to="/view-transitions-api/1"
          class="gallery-link"
          @click="handleClick"
        >
          <img
            id="image-1"
            class="gallery-img"
            src="https://images.unsplash.com/photo-1545622783-b3e021430fee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80"
            alt="Family decorating a tree for the holidays."
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import { transitionHelper } from '~~/utils/transitionHelper';

const count = ref(0);

const handleClick = (ev) => {
  transitionHelper({
    async updateDom() {
      count.value++;
      await nextTick;
    },
  });
};
</script>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.gallery-item {
}

.gallery-link {
  display: block;
  width: 100%;
  aspect-ratio: 16/9;
}

.gallery-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  contain: layout;
  view-transition-name: gallery-img;
  user-select: none;
}
</style>

<style>
body {
  padding: 5rem;
}

::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  display: block;
}

/* Custom transition */
@keyframes fade-out {
  from {
    transform: scaleX(1);
    opacity: 1;
  }
  to {
    transform: scaleX(0);
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

html::view-transition-old(gallery-img),
html::view-transition-new(gallery-img) {
  animation-duration: 800ms;
  animation-name: fade-in;
}

html::view-transition-old(gallery-img) {
  animation-name: fade-out;
}
</style>
