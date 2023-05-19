<template>
  <div class="wrap">
    <div>
      <p class="title">List</p>
      <ul class="list">
        <li>
          <NuxtLink class="link" to="/long-press-btn">長押しボタン</NuxtLink>
        </li>
        <li><NuxtLink class="link" to="/swipe-btn">スワイプボタン</NuxtLink></li>
        <li><NuxtLink class="link" to="/ocr">OCR</NuxtLink></li>
        <li><NuxtLink class="link" to="/turn-page">ページめくり</NuxtLink></li>
      </ul>
    </div>
    <div>
      <p class="title mt20">PIXI</p>
      <ul class="list">
        <li><NuxtLink class="link" to="/pixi">PIXI</NuxtLink></li>
        <li><NuxtLink class="link" to="/pixi/shooting01">shooting01</NuxtLink></li>
        <li><NuxtLink class="link" to="/pixi/particle01">particle01</NuxtLink></li>
        <li><NuxtLink class="link" to="/pixi/particle02">particle02</NuxtLink></li>
        <li><NuxtLink class="link" to="/pixi/particle03">particle03</NuxtLink></li>
        <li><NuxtLink class="link" to="/pixi/firework01">firework01</NuxtLink></li>
        <li><NuxtLink class="link" to="/pixi/polygon01">polygon01</NuxtLink></li>
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

.mt20 {
  margin-top: 20px;
}
</style>
