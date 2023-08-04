// store/modules/notification.js
const state = {
    orderCreatedTestAdmin: 'test'
  };
  
  const mutations = {
    setOrderCreatedTestAdmin(state, message) {
      state.orderCreatedTestAdmin = message;
    }
  };
  
  const actions = {};
  
  const getters = {
    getOrderCreatedTestAdmin: (state) => state.orderCreatedTestAdmin
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  