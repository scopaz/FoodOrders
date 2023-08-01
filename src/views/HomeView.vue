<template>
  <div>
    <div v-if="foodtypes">
      <!-- Render the list of food types -->
      <button v-for="foodtype in foodtypes" :key="foodtype.foodTypeID" @click="selectFoodType(foodtype) " >
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


  <div>Total : {{ total }}</div>

  <button @click="commander">Commander</button>
</template>


<script setup>
import FoodType from '../components/FoodType.vue' // Import the FoodItem component
import {getFoodItems, createOrder} from "../api/foodOrders.api"
import { ref, onMounted } from 'vue';
import { computed } from '@vue/reactivity'; // Import computed from @vue/reactivity package
import { useStore } from 'vuex';
import { getTimeForMorocco } from '../helper/timeUtils';
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

const store = useStore();
// Use a computed property to get the selected food items from the Vuex store
const selectedFoodItems = computed(() => store.state.selectedFoodItems);

// Compute the total price of selected food items
const total = computed(() => {
  let totalPrice = selectedFoodItems.value.reduce((acc, item) => {
    const quantity = item.quantity === 'minus' ? -1 : 1;
    return acc + quantity * item.fooditem.price;
  }, 0);

  // Ensure that the total price is not less than 0
  totalPrice = Math.max(totalPrice, 0);

  // Format the total price to 2 decimal places
  return totalPrice.toFixed(2);

});


const commander = async () => {
  
    const order = {
    "CustomerName" :"customerName", 
    "OrderDate": await getTimeForMorocco(), 
    "TotalAmount": total.value,
    "Status": "In Progress"
    }

    const response = await createOrder(order);
    console.log(response);
}


</script>

<style>
/* Add your custom styles here */
</style>
