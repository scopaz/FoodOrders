<template>
    <div>
      <!-- CustomerName1
      Tacos Mix * 2
      Tacos Dinde * 3
      Totale : 40 DH
      In Progress

      <button> Complete </button>
      -------------------------------
      CustomerName2
      Sandwish nugget * 2
      Frite * 1
      Totale : 30 DH
      In Pr   ogress

      <button> Complete </button>
      <p></p> -->

      <div v-if="hasNotifications">
        <div v-for="order in orderNotifications" :key="order.id">
          {{ order.customerName }} - {{ order.status }}
         - {{ convertISOToCustomFormat(order.orderDate) }}
          <div v-for="item in order.orderItems" :key="order.id">
            {{ getNameByFoodItemID(item.foodItemID) }} - {{ item.quantity }}
          </div>
        </div>
      </div>
      <div v-else>
        No notifications available.
      </div>
    </div>
  </template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import {createSignalRConnection} from '../services/signalRService'
import {convertISOToCustomFormat} from '../helper/timeUtils'
const store = useStore();
const orders = computed(() => store.getters['notification/orderNotifications']);
const orderNotifications = computed(() => store.state.notifications.orderNotifications);
const selectedFoodItemsNotifications = computed(() => store.state.notifications.selectedFoodItemsNotifications);
const connection = createSignalRConnection();
const hasNotifications = computed(() => orderNotifications.value.length > 0);

function getNameByFoodItemID(foodItemID) {
    const flattenedFoodItems = selectedFoodItemsNotifications.value.flat();
    const matchingFoodItem = flattenedFoodItems.find(item => item.fooditem.foodItemID === foodItemID);

    if (matchingFoodItem) {
        return matchingFoodItem.fooditem.name;
    } else {
        return null; // No matching food item found
    }
}



onMounted(async () => {
  connection.start()
    .then(() => {
      if (connection.state === 'Connected') {
        connection.invoke('JoinAdminGroup');
        console.log('Joined admin group');
  }
    })
    .catch((error) => {
        console.error('Error connecting to SignalR hub:', error);
    });

  connection.on('ReceiveOrder', (order, selectedFoodItems) => {
    console.log(order);
    console.log(selectedFoodItems);
    store.commit('notifications/setOrderNotifications', [...store.state.notifications.orderNotifications, order]);
    store.commit('notifications/setSelectedFoodItemsNotifications', [...store.state.notifications.selectedFoodItemsNotifications, selectedFoodItems]);
  });
});
</script>