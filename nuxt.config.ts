import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    oidc: {
      providers: {
        oidc: {
          clientId: '',
          clientSecret: '',
          authorizationUrl: '',
          tokenUrl: '',
          userInfoUrl: '',
          logoutUrl: '',
          redirectUri: '',

          responseType: 'code',
          authenticationScheme: 'body',
          scope: ['openid', 'profile', 'offline_access', 'roles'],
          pkce: true,
          tokenRequestType: 'form-urlencoded',
          skipAccessTokenParsing: true,
          validateAccessToken: false,
          validateIdToken: false,
          exposeAccessToken: true,

          callbackRedirectUrl: '/',
          logoutRedirectUrl: '/'
        }
      }
    },
    public: {
      apiBase: process.env.PRIVATE_API_BASE_URL
    }
  },
  oidc: {
    defaultProvider: 'oidc',
    session: {
      automaticRefresh: true,
      expirationCheck: true,
      maxAge: 60 * 60 * 24,
    },
    middleware: {
      globalMiddlewareEnabled: false,
      customLoginPage: false,
    },
    providers: {
      oidc: {
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
    '@pinia/nuxt',
    'nuxt-oidc-auth'
  ],
  plugins: [

  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'node-server',
    storage: { // Use local file system storage for dev quick setup
      oidc: {
        driver: 'fs',
        base: 'oidcstorage',
      },
    },
  },
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