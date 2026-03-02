export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const nuxtApp = useNuxtApp();
  const oidc = nuxtApp.$oidc as any;

  if (!oidc) return;

  const user = await oidc.getUser();

  if (!user || user.expired) {
    await oidc.signinRedirect({ state: to.fullPath });
    return abortNavigation();
  }

  // Check for Student role
  const roles = user.profile?.role || [];
  const isStudent = Array.isArray(roles) 
    ? (roles.includes('Student') || roles.includes('student'))
    : (roles === 'Student' || roles === 'student');

  if (!isStudent) {
    return navigateTo('/');
  }

  // Grab the university id from the claim
  const claimUniId = user.profile?.university_id;

  if (!claimUniId) {
    return navigateTo('/');
  }
});
