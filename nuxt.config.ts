// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['modern-css-reset', '@/assets/css/base.css'],
  vite: {
    define: {
      'process.env.TESS_ENV': JSON.stringify('production'),
    },
  },
});
