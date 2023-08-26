const state = {
    selectedFoodItems: [],
  };
  const  mutations = {
    addToSelectedFoodItems(state, payload) {
      state.selectedFoodItems.push(payload);
    },
    removeFromSelectedFoodItems(state, payload) {
      state.selectedFoodItems.pop();
    },
    resetSelectedFoodItems(state) {
      state.selectedFoodItems = [];
    },
  };
  const actions = {};
  const getters = {
    getSelectedFoodItems: (state) => state.selectedFoodItems
  };

  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };