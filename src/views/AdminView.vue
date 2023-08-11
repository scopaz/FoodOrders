<template>


<ion-content ref="content" class="ion-padding">

      <h2>Orders</h2>

      <div v-if="hasNotifications">
        <div v-for="order in sortedNotifications" :key="order.id">
          <h3>Order ID: {{ order.orderID }}</h3>
          <p>Customer Name: {{ order.customerName }}</p>
          <p>Order Date: {{ convertISOToCustomFormat(order.orderDate) }}</p>
          <p>Total Amount: {{ order.totalAmount }}</p>
          <p>Status: {{ order.status }}</p>
          <h4>Order Items:</h4>
         <ul>
          <li v-for="orderItem in order.orderItems" :key="orderItem.orderItemID">
            <p>OrderItem: {{ orderItem.orderItemID }}</p>
            <p>Quantity: {{ orderItem.quantity }}</p>
            <p>Food Item Name: {{ getNameByFoodItemID(orderItem.foodItemID) }}</p>
          </li>
         </ul>
        </div>
      </div>
      <div v-else>
        No notifications available.
      </div>
    <div>
      <div v-for="order in ordersInProgress.data" :key="order.orderID">
        <h3>Order ID: {{ order.orderID }}</h3>
        <p>Customer Name: {{ order.customerName }}</p>
        <p>Order Date: {{ convertISOToCustomFormat(order.orderDate) }}</p>
        <p>Total Amount: {{ order.totalAmount }}</p>
        <p>Status: {{ order.status }}</p>
        <h4>Order Items:</h4>
        <ul>
          <li v-for="orderItem in order.orderItems" :key="orderItem.orderItemID">
            <p>OrderItem: {{ orderItem.orderItemID }}</p>
            <p>Quantity: {{ orderItem.quantity }}</p>
            <p>Food Item Name: {{ orderItem.foodItem.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </ion-content>


  </template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {createSignalRConnection} from '../services/signalRService'
import {convertISOToCustomFormat} from '../helper/timeUtils'
import { getFullOrders, createOrder, checkAuth } from '../api/foodOrders.api';
const store = useStore();
const orders = computed(() => store.getters['notification/orderNotifications']);
const selectedFoodItemsNotifications = computed(() => store.state.notifications.selectedFoodItemsNotifications);
const connection = createSignalRConnection();
let ordersInProgress = ref([]);
const hasNotifications = computed(() => orderNotifications.value.length > 0 );


const orderNotifications = computed(() => store.state.notifications.orderNotifications);
const sortedNotifications = computed(() => {
  // Sort the orderNotifications by order date in descending order
  return orderNotifications.value.slice().sort((a, b) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);
    return dateB - dateA;
  });
});

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

  const response = await getFullOrders();
// Extract the array of orders from the $values property
const orders = response;
console.log(orders)

// Clean the orders data by removing the special properties
  ordersInProgress.value = orders


  
});
</script>