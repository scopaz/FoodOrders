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
import FoodType from '../components/FoodType.vue';
import { getFoodItems, createOrder } from '../api/foodOrders.api';
import { ref, onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { getTimeForMorocco } from '../helper/timeUtils';

const foodtypes = ref(null);
const selectedFoodType = ref(null);

const fetchFoodItems = async () => {
  try {
    const response = await getFoodItems();
    foodtypes.value = response.data;
  } catch (error) {
    console.error('Error fetching food items:', error);
  }
};

onMounted(() => {
  fetchFoodItems();
});

const selectFoodType = (foodtype) => {
  selectedFoodType.value = foodtype;
};

const store = useStore();
const selectedFoodItems = computed(() => store.state.selectedFoodItems);

const total = computed(() => {
  let totalPrice = selectedFoodItems.value.reduce((acc, item) => {
    const quantity = item.quantity === 'minus' ? -1 : 1;
    return acc + quantity * item.fooditem.price;
  }, 0);

  totalPrice = Math.max(totalPrice, 0);
  return totalPrice.toFixed(2);
});

const commander = async () => {
  // Create an object to store the aggregated quantities for each FoodItemId
  const aggregatedQuantities = {};

  // Loop through selectedFoodItems.value and aggregate the quantities
  selectedFoodItems.value.forEach(item => {
    const foodItemId = item.fooditem.foodItemID;
    const quantity = item.quantity === 'minus' ? -1 : 1;

    // If the FoodItemId already exists in the object, add the quantity to the existing value
    if (aggregatedQuantities.hasOwnProperty(foodItemId)) {
      aggregatedQuantities[foodItemId] += quantity;
    } else {
      // If the FoodItemId is not in the object, initialize it with the quantity
      aggregatedQuantities[foodItemId] = quantity;
    }
  });

  // Convert the aggregated quantities object into an array of OrderItems
  const orderItems = Object.entries(aggregatedQuantities).map(([foodItemId, quantity]) => ({
    FoodItemId: parseInt(foodItemId),
    Quantity: quantity
  }));

  // Create the order object
  const order = {
    CustomerName: 'customerName',
    TotalAmount: total.value,
    Status: 'In Progress',
    OrderItems: orderItems
  };


  // Call the createOrder API with the createOrderDto
  const response = await createOrder(order);
  console.log(response);
};
</script>

<style>
/* Add your custom styles here */
</style>
