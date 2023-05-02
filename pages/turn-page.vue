<template>
  <div>
    <div class="wrapper">
      <div class="book">
        <button
          v-for="(page, index) in pages"
          :key="index"
          class="page"
          :class="{ turned: page.turned }"
          :style="`--turnedDeg: -${88 - (pages.length - index - 1) * 2}deg;`"
          @click="turnPage(index)"
        >
          {{ page.contents }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Page = {
  contents: String
  turned?: boolean
}

const pages = ref<Page[]>([
  {
    contents:
      '1. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque molestias debitis a doloremque cum dicta sapiente tenetur, sequi earum exercitationem odio qui deserunt quis aut unde quam totam perferendis porro.',
  },
  {
    contents:
      '2. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque molestias debitis a doloremque cum dicta sapiente tenetur, sequi earum exercitationem odio qui deserunt quis aut unde quam totam perferendis porro.',
  },
  {
    contents:
      '3. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque molestias debitis a doloremque cum dicta sapiente tenetur, sequi earum exercitationem odio qui deserunt quis aut unde quam totam perferendis porro.',
  },
])

const turnPage = (index: number) => {
  if (!pages.value[index].turned) {
    pages.value[index].turned = true
  } else {
    for (let i = 0; i <= index; i++) {
      pages.value[i].turned = false
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 2rem;
}

.book {
  outline: 1px solid violet;
  position: relative;
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
  perspective: 1400px;
  perspective-origin: 0% 50%;
}

.page {
  position: absolute;
  inset: 0;
  outline: 1px solid palegoldenrod;
  background-color: #fff;
  transform-origin: left;
  transition: 2s cubic-bezier(0.65, 0, 0.35, 1) transform;
  background-color: #eee;
  border: 0;
}

.turned {
  transform: rotateY(var(--turnedDeg));
}
</style>
