<template>
    <ion-page class="login-page">

      <ion-content class="ion-padding">
        <div class="background-image"></div>
        <div class="login-form ion-padding">
          <!-- <img src="@/assets/images/logo2.jpg" alt="Food Order App Logo" class="app-logo"> -->
          <form @submit.prevent="submitForm">
            
            <ion-item>
              <ion-input label="Email:" labelPlacement="stacked" type="text" v-model="email" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Nom:" labelPlacement="stacked" type="text" v-model="lastName" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Prénom:" labelPlacement="stacked" type="text" v-model="firstName" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Téléphone" labelPlacement="stacked" type="text" v-model="phone" required></ion-input>
            </ion-item>
            <ion-item>
              <ion-input label="Mot de passe:" labelPlacement="stacked" type="password" v-model="password" required></ion-input>
            </ion-item>
            <ion-button color="tertiary" expand="full" class="ion-margin-top" type="submit">Register</ion-button>
          </form>
          <p v-if="errorMessage" class="error-message ion-text-center">{{ errorMessage }}</p>
  
        </div>
  
       
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonHeader, IonToolbar , IonTitle, IonInput, IonButton, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonThumbnail, IonLabel, IonList} from '@ionic/vue';
  
  import { ref } from 'vue';
  import { register } from "../api/foodOrders.api";
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  
  const email = ref('');
  const lastName = ref('');
  const firstName = ref('');
  const phone = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const store = useStore();
  const router = useRouter();
  
  const submitForm = async () => {
    try {
    
        const registerUserData = {
            Email: email.value,
            Lastname: lastName.value,
            Firstname: firstName.value,
            Phone: phone.value,
            Password: password.value,
            UserName: email.value // to avoid internal error from backend, uername should be set
        };

        const response = await register(registerUserData);
        
        

        router.push('/login');

        email.value = '';
        lastName.value = '';
        firstName.value = '';
        phone.value = '';
        password.value = '';

    } catch (error) {
      errorMessage.value = 'Something went wrong, please try again';
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
  