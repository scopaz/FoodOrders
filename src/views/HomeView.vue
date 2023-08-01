<template>
  <div>
    <div v-if="foodtypes">
      <!-- Render the list of food types -->
      <button v-for="foodtype in foodtypes" :key="foodtype.foodTypeID" @click="selectFoodType(foodtype)">
        {{ foodtype.name }}
      </button>
    </div>
    <div v-else>
      Loading...
    </div>

    <!-- Render the selected food type and its food item -->
    <div v-if="selectedFoodType">
      <FoodType :foodtype="selectedFoodType" /> 
    </div>
  </div>
</template>


<script setup>
import FoodType from '../components/FoodType.vue' // Import the FoodItem component
import {getFoodItems} from "../api/foodOrders.api"
import { ref, onMounted } from 'vue';


const foodtypes = ref(null);
const selectedFoodType = ref(null);

const fetchFoodItems = async () => {
  try {
    const response = await getFoodItems(); // 
    foodtypes.value = response.data; // Assuming the API returns an array of food items
  } catch (error) {
    console.error('Error fetching food items:', error);
  }
};

onMounted(() => {
  fetchFoodItems();
});

// Function to set the selected food type
const selectFoodType = (foodtype) => {
  selectedFoodType.value = foodtype;
};
</script>

<style>
/* Add your custom styles here */
</style>
