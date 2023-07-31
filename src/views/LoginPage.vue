<template>
  <div class="login-page">
    <div class="background-image"></div>
    <div class="login-form">
      <img src="@/assets/images/logo.jpg" alt="Food Order App Logo" class="app-logo">
      <h2 class="login-title">Food Order App</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {getCustomers, login} from "../api/foodOrders.api"
import { useRouter } from 'vue-router'; // Import the useRouter function from vue-router
export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const token = ref(null);
    const router = useRouter(); // Get the router instance

    const submitForm = async () => {
      try {
        // Call the login API to authenticate the user and get the token
        const response = await login(email.value, password.value);

        // Set the token with the obtained value
        token.value = response.token;

        // Navigate to '/home' route using the router
        router.push('/home');

        // Reset the form after successful submission
        email.value = '';
        password.value = '';
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return {
      email,
      password,
      token,
      submitForm,
    };
  },
};
</script>

<style>
.login-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.5); /* Adjust the brightness of the background image */
  z-index: -1;
}

.login-form {
  max-width: 320px;
  padding: 40px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.app-logo {
  display: block;
  max-width: 100px;
  margin: 0 auto 20px;
}
</style>
