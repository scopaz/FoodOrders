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
const store = useStore();
const orders = computed(() => store.getters['notification/orderNotifications']);
const orderNotifications = computed(() => store.state.notifications.orderNotifications);
console.log(orders)
const connection = createSignalRConnection();
const hasNotifications = computed(() => orderNotifications.value.length > 0);



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

  connection.on('ReceiveOrder', (order) => {
    console.log(order);
    store.commit('notifications/setOrderNotifications', [...store.state.notifications.orderNotifications, order]);
  });
});
</script>