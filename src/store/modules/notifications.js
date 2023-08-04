// store/modules/notification.js
const state = {
  orderNotifications: []
};

const mutations = {
  addOrderNotification(state, message) {
    state.orderNotifications.push(message);
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
