<template>
    <div>
      <ul>
              <li>{{ fooditem.name }}</li>
              <li>{{ fooditem.description }}</li>
              <li>{{ fooditem.price }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      fooditem: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  