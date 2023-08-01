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

const Operations = {
  Minus: 'minus',
  Plus: 'plus',
};

const quantity = ref(0);

// Declare the props using the `defineProps` function
const { fooditem } = defineProps(['fooditem']);

// Declare the emits using the `defineEmits` function
const emit = defineEmits();

const handleClick = (operator) => {
  if(operator == Operations.Minus && quantity.value > 0) quantity.value--;
  if(operator == Operations.Plus) quantity.value++;
  if(quantity.value != 0)
    // Emit the "select" event with the selected food item as the payload
    emit('select', fooditem);
};
</script>
