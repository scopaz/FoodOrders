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

      {{ orderCreatedTestAdmin }}
      
    </div>
  </template>

<script setup>
import { computed,onMounted  } from 'vue';
import { useStore } from 'vuex';

const orderCreatedTestAdmin = computed(() => store.getters['notifications/getOrderCreatedTestAdmin']);
    const store = useStore();
    const messageConnection = "";
  

    
</script>