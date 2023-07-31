<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="customer in customers" :key="customer.customerId">
          {{ customer.firstName }} - {{ customer.lastName }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import { getCustomers } from '../api/foodOrders.api';

export default {
  data() {
    return {
      loading: false,
      customers: [],
    };
  },
  created() {
    this.fetchCustomers();
  },
  methods: {
    fetchCustomers() {
      this.loading = true;
      getCustomers()
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>