// store/modules/notification.js
const state = {
  orderNotifications: []
};

const mutations = {
  setOrderNotifications(state, notifications) {
    state.orderNotifications = notifications;
  }
};

const actions = {};

const getters = {
  getOrderNotifications: (state) => state.orderNotifications
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
