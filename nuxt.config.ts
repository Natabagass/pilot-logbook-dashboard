export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/styles/main.scss'],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/flight-icon.png' }]
    }
  },
  vite: {
    optimizeDeps: {
      include: ['chart.js', 'vue-chartjs']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/styles/variables" as *;'
        }
      }
    }
  }
})
