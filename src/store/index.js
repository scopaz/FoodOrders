import { createStore } from 'vuex'; // Import createStore from Vuex
import userModule from './modules/user';
import foodItemModule from './modules/fooditem';
const store = createStore({
  modules: {
    user: userModule,
    fooditem: foodItemModule
  },
});

export default store;