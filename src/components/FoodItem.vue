<template>
  <div @click="handleClick">
    <!-- Display the food item details here -->
    {{ fooditem.name }}
    {{ fooditem.description }}
    {{ fooditem.price }}
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Declare the props using the `defineProps` function
const { fooditem } = defineProps(['fooditem']);

// Declare the emits using the `defineEmits` function
const emit = defineEmits();

const handleClick = () => {
  // Emit the "select" event with the selected food item as the payload
  emit('select', fooditem);
};
</script>
