<template>
    <div>
      <FoodItem v-if="fooditems" :fooditems="fooditems" />
      
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
      foodtypes: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const fooditems = ref({}); // Use a reactive reference (ref) here
      
      onMounted(() => {
        fooditems.value = props.foodtypes; // Assign the value to fooditems.value
      });

      return {
        fooditems, // Return the reactive reference as part of an object
      };
    },
  };
  </script>
  