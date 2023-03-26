<template>
  <div>
    <NuxtLink to="/view-transitions-api" class="button" @click="handleClick"
      >Back</NuxtLink
    >
    <figure class="full-size">
      <img
        id="image-1"
        class="full-img"
        src="https://images.unsplash.com/photo-1545622783-b3e021430fee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80"
        alt="Family decorating a tree for the holidays."
      />
      <figcaption>
        <p>
          Photo by
          <a href="https://unsplash.com/photos/vcX5AhBwk6s">Jonathan Borba</a>
        </p>
      </figcaption>
    </figure>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import { transitionHelper } from '~~/utils/transitionHelper';

const handleClick = (ev) => {
  transitionHelper({
    async updateDom() {
      await nextTick;
    },
  });
};
</script>

<style scoped>
.button {
  display: inline-grid;
  place-content: center;
  border-radius: 4px;
  background: #999;
  color: #eee;
  padding-inline: 16px;
  padding-block: 8px;
}

.full-size {
  height: 60vh;
  height: 60svh;
  aspect-ratio: 16/9;
  margin-top: 100px;
}

.full-img {
  object-fit: cover;
  object-position: center;
  view-transition-name: gallery-img;
  contain: layout;
  user-select: none;
}
</style>
