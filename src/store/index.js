import { createStore } from 'vuex'; // Import createStore from Vuex
import userModule from './modules/user';
import foodItemModule from './modules/fooditem';
import connectionSignalRModule from './modules/connectionSignalR';
import notificationsModule from './modules/notifications';
const store = createStore({
  modules: {
    user: userModule,
    fooditem: foodItemModule,
    connectionSignalR: connectionSignalRModule,
    notifications : notificationsModule
  },
});

export default store;