const state = {
    selectedFoodItems: [],
  };
  const  mutations = {
    addToSelectedFoodItems(state, payload) {
      state.selectedFoodItems.push(payload);
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