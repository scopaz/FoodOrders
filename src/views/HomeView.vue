<template>
   <div  v-if="foodtypes">
      <FoodType v-for="foodtype in foodtypes" :key="foodtype.foodTypeID" :foodtype="foodtype" />
  </div>
    <div v-else>Loading...</div>
</template>


<script>
import FoodType from '../components/FoodType.vue' // Import the FoodItem component
import {getFoodItems} from "../api/foodOrders.api"
import { ref, onMounted } from 'vue';

export default {
  components: {
    FoodType,
  },
  setup() {
    const foodtypes = ref(null);

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

    return {
      foodtypes,
    };
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
