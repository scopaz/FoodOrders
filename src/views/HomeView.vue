<template>
  <user-profil />
 
    <div>
      <div v-if="foodtypes">
        <!-- Render the list of food types -->
        <button v-for="foodtype in foodtypes" :key="foodtype.foodTypeID" @click="selectFoodType(foodtype) " >
          {{ foodtype.name }}
        </button>
      </div>
      <div v-else>
        Loading...
      </div>
  
      <!-- Render the selected food type and its food item -->
      <div v-if="selectedFoodType">
        <food-type :foodtype="selectedFoodType" /> 
      </div>
    </div>
  
  
    <div>Total : {{ total }}</div>
  
    <button @click="commander">Commander</button>
  </template>
  
  
  <script setup>
  import UserProfil from '../components/UserProfil.vue';
  import FoodType from '../components/FoodType.vue';
  import AdminView from '../views/AdminView.vue';
  import { getFoodItems, createOrder, checkAuth } from '../api/foodOrders.api';
  import { ref, onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useStore } from 'vuex';
  import { getTimeForMorocco } from '../helper/timeUtils';
  import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
  import {createSignalRConnection} from '../services/signalRService'
  const foodtypes = ref(null);
  const selectedFoodType = ref(null);
  const adminNotification = ref('');
  const connection = createSignalRConnection();
  const store = useStore();
  const isAdmin = ref(false);
  let orderNotifications = ref('test');
  const userInfo = store.getters['user/getUserInfo'];
  const orders = ref([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userInfo);

  const fetchFoodItems = async () => {
    try {
      const response = await getFoodItems();
      foodtypes.value = response.data;
      
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
  
  onMounted(async () => {
    fetchFoodItems();
  
    connection.start()
      .then(() => {
          console.log('Connected to SignalR hub');
      })
      .catch((error) => {
          console.error('Error connecting to SignalR hub:', error);
      });
  
    try {
      const response = await checkAuth(); // Replace with the actual API call
      isAdmin.value = response.data.isAdmin;
      console.log(isAdmin.value);
    } catch (error) {
      console.error('Error checking user role:', error);
    }
    
  });
  
  
  connection.on('ReceiveOrder', (order) => {
    console.log(order);
  store.commit('notifications/setOrderNotifications', [...store.state.notifications.orderNotifications, order]);
});
      
  
  
    
  const selectFoodType = (foodtype) => {
    selectedFoodType.value = foodtype;
  };
  
  
  
  const selectedFoodItems = computed(() => store.getters['fooditem/getSelectedFoodItems'])
  
  
  
  const total = computed(() => {
    let totalPrice = selectedFoodItems.value.reduce((acc, item) => {
      const quantity = item.quantity === 'minus' ? -1 : 1;
      return acc + quantity * item.fooditem.price;
    }, 0);
  
    totalPrice = Math.max(totalPrice, 0);
    return totalPrice.toFixed(2);
  });
  
  const commander = async () => {
    // Create an object to store the aggregated quantities for each FoodItemId
    const aggregatedQuantities = {};
  
    // Loop through selectedFoodItems.value and aggregate the quantities
    selectedFoodItems.value.forEach(item => {
      const foodItemId = item.fooditem.foodItemID;
      const quantity = item.quantity === 'minus' ? -1 : 1;
  
      // If the FoodItemId already exists in the object, add the quantity to the existing value
      if (aggregatedQuantities.hasOwnProperty(foodItemId)) {
        aggregatedQuantities[foodItemId] += quantity;
      } else {
        // If the FoodItemId is not in the object, initialize it with the quantity
        aggregatedQuantities[foodItemId] = quantity;
      }
    });
  
    // Convert the aggregated quantities object into an array of OrderItems
    const orderItems = Object.entries(aggregatedQuantities).map(([foodItemId, quantity]) => ({
      FoodItemId: parseInt(foodItemId),
      Quantity: quantity
    }));
  
    // Create the order object
    const order = {
      "CustomerName": "Michael Brown",
      "TotalAmount": 6.99,
      "Status": "In Progress",
      "OrderItems": orderItems,
    };
    try {
    // Wait for the SignalR connection to start before sending the notification
    if (connection.state === 'Connected') {
  
    // Call the createOrder API with the createOrderDto
    const response = await createOrder(order);
    console.log('Sending order:', order);
    // Notify admin via SignalR

    await connection.invoke('ReceiveOrderNotification', order);

    
  }
  else{
    console.warn('SignalR connection is not yet established.');
  }
  } catch (error) {
    console.error('Error sending order notification:', error);
    adminNotification.value = 'Error sending order notification';
  }
  

  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  