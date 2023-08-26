<template>
  <ion-page>
    <ion-header>
  <ion-toolbar>
    <ion-title  class="ion-text-center">My Orders</ion-title>
  </ion-toolbar>
</ion-header>
  <ion-content ref="content" class="ion-padding">
    <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
        
    <h2>Orders</h2>
  
       
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
          <p v-if="order.status == 'In Progress'" style="color:orange">Status: {{ order.status.replace('In Progress','En cours de préparation') }}</p>
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
  
  import { useRoute } from 'vue-router';
  import {  IonTitle, IonHeader, IonToolbar, IonRefresher, IonRefresherContent, IonButton, IonCol, IonGrid, IonRow, IonPage, IonItem, IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent } from '@ionic/vue';
  import { computed, onMounted, ref, inject, watch } from 'vue';
  import { useStore } from 'vuex';
  import {convertISOToCustomFormat} from '../helper/timeUtils'
  import { getFullOrders, updateOrderToCompleted, checkAuth } from '../api/foodOrders.api';
  const store = useStore();
  let ordersInProgress = ref([]);
  const connection = inject('signalRConnection'); // Use the injected connection
  
  const route = useRoute();
  
  const handleRefresh = async (event) => {
    await fetchOrders();
    event.target.complete();
};
  
  onMounted(async () => {
    
  
      
    connection.on("ReceiveOrderCompletedNotification", async function (orderId) {

      const orderIndex = ordersInProgress.value.data.findIndex(o => o.orderID === orderId);

  if (orderIndex !== -1) {
    ordersInProgress.value.data[orderIndex].status = 'Completed';
  }

    // Handle the received order completed notification
      console.log("Order completed:", orderId);
      // Trigger vibration
      await Haptics.vibrate();
        
  
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Order Completed!',
          body: 'The Order is ready !',
          id: 1, // Use a unique identifier for each order
          schedule: { allowWhileIdle: true },
          // sound: "../assets/beep1.wav",
        },
      ],
      
    });
      });
  
  
  
      await fetchOrders();

  
  
    
  });
      // Watch for changes in the route query parameter 'refreshKey'
   watch(() => route.query.refreshKey, async () => {
    await fetchOrders();
  });

    const fetchOrders = async () => {
  try {
    const response = await getFullOrders();
    ordersInProgress.value = response;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};
  </script>
  
  <style scoped>
  ion-button{
    --maring-left : 100px;
  }
  </style>