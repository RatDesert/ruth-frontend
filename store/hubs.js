export const state = () => ({
  hubs: {},
});

export const getters = {
  getHubs: (state) => state.hubs,
  getHub: (state) => (hubId) => state.hubs[hubId],
};
export const mutations = {
  UPDATE_HUBS(state, data) {
    state.hubs = data;
  },
};
