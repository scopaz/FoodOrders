<template>

<ion-page>
<ion-content ref="content" class="ion-padding">

      <h2>Orders</h2>

      <div v-if="hasNotifications">
        <ion-item v-for="order in sortedNotifications" :key="order.id">
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label>
                  <!-- <h3>Order ID: {{ order.orderID }}</h3> -->
                  <p>Client : {{ order.customerName }}</p>
                  <p>Date: {{ convertISOToCustomFormat(order.orderDate) }}</p>
                  <p>Montant: {{ order.totalAmount }} DH</p>
                  <p v-if="order.status == 'In Progress'" style="color:blue">Status: {{ order.status.replace('In Progress','En cours de préparation') }}</p>
                  <p v-else style="color:green">Status: {{ order.status.replace('Completed','Completer') }}</p>
                  <ul>
                    <li v-for="orderItem in order.orderItems" :key="orderItem.orderItemID">
                      <!-- <p>OrderItem: {{ orderItem.orderItemID }}</p> -->
                      <p>{{ orderItem.quantity }} x {{ getNameByFoodItemID(orderItem.foodItemID) }}</p>
                    </li>
                  </ul>
                </ion-label>
              </ion-col>
              <ion-col push="">
                <ion-button v-if="order.status == 'In Progress'"  color="primary" @click="completed(order.orderID, order)">Pret</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
         
        </ion-item>
      </div>
      <div v-else>
        No notifications available.
      </div>
    <div>
      <ion-item v-for="order in ordersInProgress.data" :key="order.orderID">
        <ion-grid>
            <ion-row>
              <ion-col>
        <ion-label>
        <!-- <h3>Order ID: {{ order.orderID }}</h3> -->
        <p>Client: {{ order.customerName }}</p>
        <p>Date: {{ convertISOToCustomFormat(order.orderDate) }}</p>
        <p>Montant: {{ order.totalAmount }} DH</p>
        <p v-if="order.status == 'In Progress'" style="color:blue">Status: {{ order.status.replace('In Progress','En cours de préparation') }}</p>
        <p v-else style="color:green">Status: {{ order.status.replace('Completed','Completer') }}</p>
        <ul>
          <li v-for="orderItem in order.orderItems" :key="orderItem.orderItemID">
            <!-- <p>OrderItem: {{ orderItem.orderItemID }}</p> -->
            <p>{{ orderItem.quantity }} x {{ orderItem.foodItem.name }}</p>
          </li>
        </ul>
      </ion-label>
          </ion-col>
      <ion-col push="">
            <ion-button v-if="order.status == 'In Progress'"  color="primary" @click="completed(order.orderID, order)">Pret</ion-button>
          </ion-col>
        </ion-row>
    </ion-grid>
      </ion-item>
    </div>
  </ion-content>
</ion-page>

  </template>

<script setup>
import { Haptics, ImpactStyle } from '@capacitor/haptics';

import { LocalNotifications } from '@capacitor/local-notifications';


import {  IonButton, IonCol, IonGrid, IonRow, IonPage, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {createSignalRConnection} from '../services/signalRService'
import {convertISOToCustomFormat} from '../helper/timeUtils'
import { getFullOrders, updateOrderToCompleted, checkAuth } from '../api/foodOrders.api';
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

  connection.on('ReceiveOrder', async (order, selectedFoodItems) => {
    console.log(order);
    console.log(selectedFoodItems);
    store.commit('notifications/setOrderNotifications', [...store.state.notifications.orderNotifications, order]);
    store.commit('notifications/setSelectedFoodItemsNotifications', [...store.state.notifications.selectedFoodItemsNotifications, selectedFoodItems]);

    // Trigger vibration
    await Haptics.vibrate();
      

  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'New Order Received!',
        body: 'You have a new order to process from.' + order.customerName,
        id: 1, // Use a unique identifier for each order
        schedule: { allowWhileIdle: true },
        // sound: "../assets/beep1.wav",
      },
    ],
    
  });
    });



  const response = await getFullOrders();
// Extract the array of orders from the $values property
const orders = response;
console.log(orders)

// Clean the orders data by removing the special properties
  ordersInProgress.value = orders


  
});

const completed = async (id, order) => {
  await updateOrderToCompleted(id);
  order.status = "Completed";
}
</script>

<style scoped>
ion-button{
  --maring-left : 100px;
}
</style>