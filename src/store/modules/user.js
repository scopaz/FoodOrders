// store/modules/user.js
const state = {
    userInfo: null
  };
  
  const mutations = {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  };
  
  const actions = {};
  
  const getters = {
    getUserInfo: (state) => state.userInfo
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  