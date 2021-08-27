export const state = () => ({
  notifications: [],
});

export const getters = {
  notifications: (state) => state.notifications,
};

export const mutations = {
  ADD_NOTIFICATION(state, notification) {
    if (state.notifications === 10) {
      state.notifications.shift();
    }
    state.notifications.push(notification);
    state.notifications = [...state.notifications];
  },
  REMOVE_NOTIFICATION(state, index) {
    state.notifications.splice(index, 1);
  },
};
