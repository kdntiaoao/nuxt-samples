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

const handleClick = (ev) => {
  const target = ev.currentTarget;
  const img = target.querySelector('img');
  img.style.viewTransitionName = 'full-size';
  transitionHelper({
    async updateDom() {
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
}
</style>

<style>
.transition-full-size {
  view-transition-name: full-size;
  contain: layout;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes slide-from-right {
  from {
    transform: translateX(30px);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(-30px);
  }
}

::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

::view-transition-old(full-size),
::view-transition-new(full-size) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-image-pair(full-size) {
  isolation: none;
}
</style>
