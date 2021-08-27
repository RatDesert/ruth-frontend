import { refreshCookie, accessCookie } from '../utils/auth';
export default async function ({ store, redirect, route }) {
  if (refreshCookie.valid) {
    store.commit('auth/LOGIN');
    if (!accessCookie.valid) {
      await store.dispatch('auth/refreshTokens');
    }
  }
  if (store.state.auth.authenticated && route.path === '/') {
    redirect('/hubs');
  }
  if (!store.state.auth.authenticated && route.path !== '/') {
    redirect('/');
  }
}
