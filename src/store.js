import { createStore } from 'vuex'; // Import createStore from Vuex

const store = createStore({
  state() {
    return {
      token: null,
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    // You can add other actions to handle login, logout, etc., if needed
  },
  getters: {
    getToken: state => state.token,
  },
});

export default store;