<template>
    <div>
      CustomerName1
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
      <p></p>

      <div v-for="(order, index) in orderNotifications" :key="index">
      <!-- Display each order notification -->
      {{ order }}
    </div>
      
    </div>
  </template>

<script setup>
import { computed,onMounted  } from 'vue';
import { useStore } from 'vuex';

const orderNotifications = computed(() => store.getters['notifications/getOrderNotifications']);
    const store = useStore();
    const messageConnection = "";
  

    
</script>