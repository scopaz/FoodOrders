<template>

  <ion-page>
    <ion-header>
  <ion-toolbar>
    <ion-title class="ion-text-center">Profil</ion-title>
  </ion-toolbar>
</ion-header>

  <ion-content>

    <ion-list :inset="true">
      <ion-item>
    <user-profil />
        
      </ion-item>
    </ion-list>
    <ion-list :inset="true">
      <ion-item>
        <ion-toggle :checked="themeToggle" @ionChange="toggleChange($event)" justify="space-between"
          >Dark Mode</ion-toggle
        >
      </ion-item>
    </ion-list>

    <ion-list :inset="true">
      <ion-item>
        <ion-toggle justify="space-between">Notifications</ion-toggle>
      </ion-item>
    </ion-list>

    <ion-list-header>Brightness</ion-list-header>
    <ion-list :inset="true">
      <ion-item>
        <ion-range>
          <ion-icon :icon="sunnyOutline" slot="start"></ion-icon>
          <ion-icon :icon="sunny" slot="end"></ion-icon>
        </ion-range>
      </ion-item>
      <ion-item>
        <ion-toggle justify="space-between" checked>True Tone</ion-toggle>
      </ion-item>
    </ion-list>

    <ion-list :inset="true">
      <ion-item  @click="logout"  :button="true">
        <ion-label class="ion-align-self-center">Logout</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-page>
  
</template>

<script setup>
  import {
    IonPage,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRange,
    IonText,
    IonToggle,
    IonToolbar,
    IonTitle
  } from '@ionic/vue';
  import { personCircle, personCircleOutline, sunnyOutline, sunny } from 'ionicons/icons';
  import { ref, onMounted  } from 'vue';
  import { useRouter } from "vue-router";
  import { Logout } from '../api/foodOrders.api';
  import UserProfil from '../components/UserProfil.vue';
  import { Preferences } from '@capacitor/preferences';

  const DARK_MODE_KEY = 'selectedTheme';
  const themeToggle = ref(false);

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Add or remove the "dark" class on the document body
  const toggleDarkTheme = (shouldAdd) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  // Check/uncheck the toggle and update the theme based on isDark
  const initializeDarkTheme = (isDark) => {
    themeToggle.value = isDark;
    toggleDarkTheme(isDark);
  };

  // Initialize the dark theme based on the initial
  // value of the prefers-color-scheme media query
  initializeDarkTheme(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addEventListener('change', (mediaQuery) => initializeDarkTheme(mediaQuery.matches));

  // Listen for the toggle check/uncheck to toggle the dark theme
  const toggleChange = async (ev) => {
    const selectedTheme = ev.detail.checked ? 'dark' : 'light';
    await Preferences.set({ key: DARK_MODE_KEY, value: selectedTheme });
    themeToggle.value = ev.detail.checked;
    toggleDarkTheme(ev.detail.checked);
  };

  const initializeTheme = async () => {
    const storedTheme = await Preferences.get({ key: DARK_MODE_KEY });
    if (storedTheme?.value === 'dark') {
      themeToggle.value = true;
      toggleDarkTheme(true);
    }
  };
  onMounted(() => {
    initializeTheme();
  });
     
    const router = useRouter();
  
  const logout = async () => {
    try {
      const response = await Logout();

      console.log(response.data.message);
  
      const cookieName = "token";

        // Generate an expiration date in the past to immediately expire the cookie
        const expirationDate = new Date(0); 

        // Set the cookie's path dynamically based on your application's structure
        const cookiePath = "/"; // Update this to match your application's path

        // Clear the cookie
        document.cookie = `${cookieName}=; expires=${expirationDate.toUTCString()}; path=${cookiePath};`;

      // Redirect to login or a logged out state
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };   
</script>

<style>
  /*
  * Optional CSS
  * -----------------------------------
  */

  /* This sets a different background and item background in light mode on ios */
  .ios body {
    --ion-background-color: #f2f2f6;
    --ion-toolbar-background: var(--ion-background-color);
    --ion-item-background: #fff;
  }

  /* This sets a different background and item background in light mode on md */
  .md body {
    --ion-background-color: #f9f9f9;
    --ion-toolbar-background: var(--ion-background-color);
    --ion-item-background: #fff;
  }

  /* This is added for the flashing that happens when toggling between themes */
  ion-item {
    --transition: none;
  }
</style>