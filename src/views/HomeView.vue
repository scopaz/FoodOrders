<template>
  <ion-content ref="content" class="ion-padding">
  <div class="home-view">
    <user-profil />
    <ion-card v-if="!isNative">
    <ion-card-header>
      <ion-card-title>Menu</ion-card-title>
      <ion-card-subtitle>Select Menu Item</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item v-if="foodtypes" v-for="foodtype in foodtypes" :key="foodtype.foodTypeID" @click="selectFoodType(foodtype) ">
          <ion-thumbnail slot="start">
            <img alt="" v-bind:src="foodtype.imageUrl" />
          </ion-thumbnail>
          <ion-label>{{ foodtype.name }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
    <div v-if="isNative" class="food-type-container">
      <div class="food-type-list">
        <!-- Render the list of food types -->
        <button v-for="foodtype in foodtypes" :key="foodtype.foodTypeID" @click="selectFoodType(foodtype)" class="food-type-button">
          {{ foodtype.name }}
          <img :src="foodtype.imageUrl" alt="Food Type" class="food-type-image" />
        </button>
      </div>
      <div class="selected-food-type">
        <!-- Render the selected food type and its food item -->
        <div v-if="selectedFoodType">
          <food-type :foodtype="selectedFoodType" :selected-food-items="selectedFoodItems" />
        </div>
        <div class="total">Total : {{ total }} DH</div>
        <button :disabled="total == 0" @click="commander" class="command-button">Commander</button>
      </div>
    </div>
  </div>
</ion-content>
</template>
  
  <script setup>
  import { Capacitor } from '@capacitor/core';
  import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
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

  const isNative = Capacitor.isNativePlatform();


  const fetchFoodItems = async () => {
    try {
      const response = await getFoodItems();
      foodtypes.value = response.data;
      console.log(response)
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
      "CustomerName": userData.firstname + ' ' + userData.lastname,
      "TotalAmount": parseInt(total.value),
      "Status": "In Progress",
      "OrderItems": orderItems,
    };
    try {
    // Wait for the SignalR connection to start before sending the notification
    if (connection.state === 'Connected') {
  
    // Call the createOrder API with the createOrderDto
    const response = await createOrder(order);
    console.log('Sending order:', response.data);
    // Notify admin via SignalR

    await connection.invoke('ReceiveOrderNotification', order, selectedFoodItems.value);

    
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
    ion-item {
        --padding-start: 0;
      }

/* Component-specific styles */
.home-view {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.food-type-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.food-type-list {
  margin-top: 20px;
}

.food-type-button {
  display: block;
  padding: 10px;
  margin: 10px 0;
  background-color: #3490dc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.food-type-button:hover {
  background-color: #2779bd;
}

.food-type-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}

.selected-food-type {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.total {
  margin-top: 20px;
  font-weight: bold;
}

.command-button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.command-button:hover {
  background-color: #27ae60;
}
  </style>
  