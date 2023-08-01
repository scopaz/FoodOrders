<template>
    <div>
      <ul>
              <li>{{ fooditem.name }}</li>
              <li>{{ fooditem.description }}</li>
              <li>{{ fooditem.price }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
    const { fooditem } = defineProps(['fooditem']);
  </script>
  