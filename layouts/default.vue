<template>
  <Head>
    <Title>Nuxt Samples </Title>
  </Head>
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
const props = defineProps({ title: { type: String, default: 'Nuxt Samples' } });
</script>
