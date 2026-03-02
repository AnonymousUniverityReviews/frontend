import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.PRIVATE_API_BASE_URL,
      auth: {
        authority: process.env.OIDC_AUTH_SERVER_ISSUER_URL,
        clientId: process.env.OIDC_AUTH_SERVER_CLIENT_ID,
        redirectUri: process.env.OIDC_REDIRECT_URI || 'http://localhost:8001/auth/callback',
        postLogoutRedirectUri: process.env.OIDC_POST_LOGOUT_REDIRECT_URI || 'http://localhost:8001/'
      }
    }
  },
  pages: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  plugins: [

  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'node-server',
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classPrefix: '',
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode'
  }
})