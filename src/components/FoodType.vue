<template>
  <div>
    {{ foodtype.name }}
    <div v-if="foodtype.foodItems">
      <!-- Render the food items for the selected food type -->
      <FoodItem v-for="fooditem in foodtype.foodItems" :key="fooditem.foodItemID" :fooditem="fooditem" @select="selectFoodItem" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import FoodItem from '../components/FoodItem.vue'; // Import the FoodItem component

// Declare the props using the `defineProps` function
const { foodtype } = defineProps(['foodtype']);

// Use ref() to create a reactive reference for selectedFoodItems
const selectedFoodItems = ref([]);

const selectFoodItem = (fooditem) => {
  selectedFoodItems.value.push(fooditem); // Use selectedFoodItems.value to access the array
  console.log(fooditem);
};

// Use the `onMounted` lifecycle hook to perform actions after the component is mounted
onMounted(() => {
  // You can access the reactive foodtype reference using `foodtype`
  console.log(foodtype);
});

console.log(selectedFoodItems.value); // Use selectedFoodItems.value to access the array
</script>
