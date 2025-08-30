import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.PRIVATE_API_KEY,
    oidc: {
      issuer: process.env.OIDC_AUTH_SERVER_ISSUER_URL || "http://localhost:8080/.well-known/openid-configuration",
      clientId: process.env.OIDC_AUTH_SERVER_CLIENT_ID || "mvc",
      clientSecret: process.env.OIDC_AUTH_SERVER_CLIENT_SECRET || undefined
    },
    public: {
      apiBase: process.env.PRIVATE_API_BASE_URL
    }
  },
  pages: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/test-utils', '@nuxt/image', '@nuxtjs/color-mode', '@pinia/nuxt'],
  plugins: [
    
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classPrefix: '',
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  }
})