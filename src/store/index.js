import { createStore } from 'vuex'; // Import createStore from Vuex

const store = createStore({
  state: {
    selectedFoodItems: [],
  },
  mutations: {
    addToSelectedFoodItems(state, payload) {
      state.selectedFoodItems.push(payload);
    },
  },
  actions: {},
  getters: {},
});

export default store;