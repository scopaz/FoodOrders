<template>
<div>
  <h2>User Information</h2>
  <p>Username: {{ userData.username }}</p>
  <p>Email: {{ userData.email }}</p>
  <p>First Name: {{ userData.firstname }}</p>
  <p>Last Name: {{ userData.lastname }}</p>
  <p>Phone: {{ userData.phone }}</p>
</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// persist data to locaStorage (data not gone after refresh)
const userData = JSON.parse(localStorage.getItem('userData'));
console.log(userData)

// Define a computed property to access the userInfo from the store (for future uses)
const userInfo = computed(() => store.getters['user/getUserInfo']);


</script>