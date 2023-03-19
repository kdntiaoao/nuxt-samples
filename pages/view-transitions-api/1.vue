<template>
  <div>
    <a href="/view-transitions-api" class="button">Back</a>
    <figure class="full-size">
      <img
        id="image-1"
        class="full-img transition-full-size"
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
