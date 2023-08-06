// store/modules/notification.js
const state = {
  orderNotifications: [],
  selectedFoodItemsNotifications: []
};

const mutations = {
  setOrderNotifications(state, notifications) {
    state.orderNotifications = notifications;
  },
  setSelectedFoodItemsNotifications(state, notifications) {
    state.selectedFoodItemsNotifications = notifications;
  }
};

const actions = {};

const getters = {
  getOrderNotifications: (state) => state.orderNotifications,
  getSelectedFoodItemsNotifications: (state) => state.selectedFoodItemsNotifications
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
