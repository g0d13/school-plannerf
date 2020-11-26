import { boot } from "quasar/wrappers";

export default boot(async ({ router, app, Vue }) => {
  const authService = Vue.prototype.$auth;
  router.beforeEach((to, _from, next) => {
    const fn = () => {
      // If the user is authenticated, continue with the route
      if (authService.isAuthenticated) {
        return next();
      }

      // Otherwise, log in
      authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    };

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // If loading has already finished, check our auth state using `fn()`
    if (!authService.loading) {
      return fn();
    }

    // Watch for the loading property to change before we check isAuthenticated
    authService.$watch("loading", loading => {
      if (loading === false) {
        return fn();
      }
    });
  });
});
