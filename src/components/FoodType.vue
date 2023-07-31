<template>
    {{ foodtype.name }}
    <div v-if="foodtype">
        
      <FoodItem v-for="fooditem in foodtype.foodItems" :key="fooditem.foodItemID" :fooditem="fooditem" />
      
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import FoodItem from '../components/FoodItem.vue' // Import the FoodItem component
  export default {
    components: {
      FoodItem,
    },
    props: {
      foodtype: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const foodtype = ref({}); // Use a reactive reference (ref) here
      
      onMounted(() => {
        foodtype.value = props.foodtype; // Assign the value to fooditems.value
      });

      return {
        foodtype, // Return the reactive reference as part of an object
      };
    },
  };
  </script>
  