import { accessCookie, refreshCookie } from '../utils/auth';

export const state = () => ({
  authenticated: null,
});

export const getters = {
  authenticated: (state) => state.authenticated,
};

export const mutations = {
  LOGOUT(state) {
    state.authenticated = false;
    accessCookie.expiration = '';
    refreshCookie.expiration = '';
  },

  LOGIN(state) {
    state.authenticated = true;
  },
};

export const actions = {
  async login({ commit }, credentials) {
    const data = await this.$api.$post('/auth/login/', credentials);
    accessCookie.expiration = data.access_cookie_expiration;
    refreshCookie.expiration = data.refresh_cookie_expiration;
    commit('LOGIN');
  },

  async logout({ commit, dispatch }) {
    await this.$api.$post('/auth/logout/');
    commit('LOGOUT');
  },

  async refreshTokens({ commit, dispatch }) {
    const data = await this.$api.$post('/auth/refresh_tokens/');
    accessCookie.expiration = data.access_cookie_expiration;
    refreshCookie.expiration = data.refresh_cookie_expiration;
  },
};
