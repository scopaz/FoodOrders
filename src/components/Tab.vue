<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="home" />
            <ion-label>Home</ion-label>
          </ion-tab-button>
  
          <ion-tab-button v-if="isAdmin" tab="admin" href="/admin">
            <ion-icon :icon="person" />
            <ion-label>Admin</ion-label>
          </ion-tab-button>
          <ion-tab-button v-if="!isAdmin" tab="userorders" href="/userorders">
            <ion-icon :icon="bagHandleSharp"></ion-icon>
            <ion-label>Orders</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script setup>
    import {  IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
    import { bagHandleSharp, playCircle, radio, library, search, home, person, accessibility, archiveSharp } from 'ionicons/icons';
    import {ref, onMounted} from 'vue';
    import {checkAuth} from '../api/foodOrders.api'
    let isAdmin = ref();
    onMounted(async () => {
      try {
          const response = await checkAuth();
          isAdmin.value = response.data.isAdmin;
        } catch (error) {
          console.error('Error checking authentication:', error);
        }
      });
  </script>