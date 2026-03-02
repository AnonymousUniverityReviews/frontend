import { computed, watchEffect } from 'vue'
import { useNuxtApp, useState } from '#app'
import type { User, UserManager } from 'oidc-client-ts'

export function useOidcAuth() {
  const nuxtApp = useNuxtApp()
  // $oidc is only available on the client due to .client.ts plugin extension
  const oidc = nuxtApp.$oidc as UserManager | undefined
  
  const oidcUser = useState<User | null>('oidcUser', () => null)

  const initClient = async () => {
    if (import.meta.client && oidc) {
      if (!oidcUser.value) {
        try {
          const user = await oidc.getUser()
          oidcUser.value = user
        } catch (e) {
          console.error('OIDC init error:', e)
        }
      }
      
      oidc.events.addUserLoaded((newUser: User) => {
        oidcUser.value = newUser
      })
      oidc.events.addUserUnloaded(() => {
        oidcUser.value = null
      })
      oidc.events.addSilentRenewError((e) => {
         console.error('Silent renew error', e)
      })
    }
  }

  if (import.meta.client) {
    initClient()
  }

  const loggedIn = computed(() => !!oidcUser.value && !oidcUser.value.expired)
  
  const user = computed(() => {
    if (!oidcUser.value) return null
    return {
      userInfo: oidcUser.value.profile,
      accessToken: oidcUser.value.access_token
    }
  })

  const login = (args?: any) => {
    if (import.meta.client && oidc) {
      return oidc.signinRedirect(args)
    }
  }

  const logout = (args?: any) => {
    if (import.meta.client && oidc) {
      oidcUser.value = null
      return oidc.signoutRedirect(args)
    }
  }

  return {
    loggedIn,
    user,
    login,
    logout,
    accessToken: computed(() => oidcUser.value?.access_token)
  }
}
