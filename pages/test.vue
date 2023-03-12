<template>
  <div>
    <button type="button" class="btn" style="--bg: #f00">
      <span class="btn-text"> hello world! </span>
    </button>
    <button type="button" class="btn" style="--bg: #00f">
      <span class="btn-text"> hello world! </span>
    </button>
    <button type="button" class="btn" style="--bg: #0f0">
      <span class="btn-text"> hello world! </span>
    </button>
    <button type="button" class="btn" style="--bg: #fff">
      <span class="btn-text"> hello world! </span>
    </button>
  </div>
</template>

<style scoped>
button {
  display: inline-block;
  padding: 1rem;
  font-size: 1.5rem;
}
.btn {
  background-color: var(--bg);
}
.btn-text {
  color: currentBackgroundColor;
  filter: invert(100%) grayscale(100%) contrast(100);
}
</style>
