import { defineNuxtPlugin, useRuntimeConfig, useState } from '#app'
import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const userManager = new UserManager({
    authority: config.public.auth.authority as string,
    client_id: config.public.auth.clientId as string,
    redirect_uri: config.public.auth.redirectUri as string,
    post_logout_redirect_uri: config.public.auth.postLogoutRedirectUri as string,
    response_type: 'code',
    scope: 'openid profile offline_access roles university_id',
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    automaticSilentRenew: true,
  })

  return {
    provide: {
      oidc: userManager
    }
  }
})
