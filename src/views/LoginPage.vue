<template>
  <ion-page class="login-page">
    <ion-content class="ion-padding">
      <div class="background-image"></div>
      <div class="login-form ion-padding">
        <!-- <img src="@/assets/images/logo2.jpg" alt="Food Order App Logo" class="app-logo"> -->
        <div class="app-logo">Logo</div>
        <form @submit.prevent="submitForm">
          
          <ion-item>
            <ion-input label="Email:" labelPlacement="stacked" type="text" v-model="email" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-input label="Password:" labelPlacement="stacked" type="password" v-model="password" required></ion-input>
          </ion-item>
          <ion-button color="tertiary" expand="full" class="ion-margin-top" type="submit">Login</ion-button>
        </form>
        <p v-if="errorMessage" class="error-message ion-text-center">{{ errorMessage }}</p>
        <ion-label router-link="/register" class="ion-margin-top ion-text-center">Register</ion-label>

      </div>

     
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonTitle, IonInput, IonButton, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonThumbnail, IonLabel, IonList} from '@ionic/vue';

import { ref } from 'vue';
import { login } from "../api/foodOrders.api";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode';

const email = ref('');
const password = ref('');
const token = ref(null);
const errorMessage = ref('');
const store = useStore();
const router = useRouter();

const submitForm = async () => {
  try {
    if (!email.value || !password.value) {
      errorMessage.value = 'Email and password are required.';
      return;
    }

    // Call the login API to authenticate the user and get the token
    const response = await login(email.value, password.value);

    // Set the token with the obtained value
    token.value = response.token;

    // Store the user data in localStorage

    // Decode the JWT token to access the claims
    const decodedToken = jwt_decode(token.value);
    console.log(decodedToken);

    const userData = {
      username: response.username,
      email: response.email,
      firstname: response.firstname,
      lastname: response.lastname,
    };

      store.commit('user/setUserInfo', userData);
      localStorage.setItem('userData', JSON.stringify(userData));

      router.push('/admin');
      email.value = '';
      password.value = '';
  } catch (error) {
    errorMessage.value = 'Invalid email or password.';
    console.error('Error submitting form:', error);
  }
};


</script>

<style scoped>
/* Define your styles here */
.login-form {
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column; /* Align children vertically */
  justify-content: center; /* Center content vertically */
  height: 100%; /* Expand to full height of ion-content */
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--ion-color-primary);
}

.error-message {
  color: var(--ion-color-danger);
  margin-top: 10px;
}

.app-logo {
  display: block;
  max-width: 100px;
  margin: 0 auto 20px;
  position: relative;
  z-index: 1;
  background-color: inherit;
}
ion-content {
  --background: linear-gradient(to right, #4b134f, #c94b4b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 

}
ion-item{
  --background: transparent;
}

ion-input {
  --color: white;
}

</style>
