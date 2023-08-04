const state = {
    signalRConnection: null
  };
  
  const mutations = {
    setSignalRConnection(state, connection) {
      state.signalRConnection = connection;
    }
  };
  
  const actions = {};
  
  const getters = {
    getSignalRConnection: (state) => state.signalRConnection
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  