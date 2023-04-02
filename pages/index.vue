<template>
  <div class="wrap">
    <p class="title">List</p>
    <div class="content">
      <ul class="list">
        <li>
          <NuxtLink class="link" to="/long-press-btn">long-press-btn</NuxtLink>
        </li>
        <li><NuxtLink class="link" to="/swipe-btn">swipe-btn</NuxtLink></li>
        <li><NuxtLink class="link" to="/ocr">ocr</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.wrap {
  padding: 2rem 1rem;
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}

.content {
  margin-top: 1rem;
}

.list {
  display: grid;
  gap: 0.8rem;
}

.link {
  background-color: rgb(124, 194, 84);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #fff;
}
</style>
