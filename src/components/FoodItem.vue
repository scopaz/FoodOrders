<template>
    <div>
      <ul>
        <li v-for="foodtype in fooditems" :key="foodtype.foodItemID">
          {{ foodtype.name }}
          <ul>
            <li v-for="fooditem in foodtype.foodItems" :key="fooditem.foodItemID">
              {{ fooditem.name }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      fooditems: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  