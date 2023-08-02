<template>
  <div >
    <!-- Display the food item details here -->
    {{ fooditem.name }}
    {{ fooditem.description }}
    {{ fooditem.price }}
    <button @click="handleClick(Operations.Minus)">-</button>
    {{ quantity }}
    <button @click="handleClick(Operations.Plus)">+</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useStore } from 'vuex';
const Operations = {
  Minus: 'minus',
  Plus: 'plus',
};

const quantity = ref(0);

// Declare the props using the `defineProps` function
const { fooditem } = defineProps(['fooditem']);

// Declare the emits using the `defineEmits` function
const emit = defineEmits();

const store = useStore();
const handleClick = (operator) => {
  if(operator == Operations.Minus && quantity.value > 0) quantity.value--;
  if(operator == Operations.Plus) quantity.value++;
      // Dispatch an action to add the selected food item and quantity to the store
      store.commit('fooditem/addToSelectedFoodItems', { fooditem, quantity: operator });
};
</script>
