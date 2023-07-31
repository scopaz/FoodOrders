import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomeView.vue'
import AboutPage from '../views/AboutView.vue'
import {checkAuth} from "../api/foodOrders.api"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true } // Add this meta property to indicate the route requires authentication
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true } // Add this meta property to indicate the route requires authentication
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: { requiresAuth: true } // Add this meta property to indicate the route requires authentication
    }
  ]
});


// Register the navigation guard
router.beforeEach(async (to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    try {
      // Send a request to check if the user is authenticated
      const response = await checkAuth();
      const authenticated = response.data.authenticated;

      if (authenticated) {
        // User is authenticated, allow access to the route
        next();
      } else {
        // User is not authenticated, redirect to login page
        next('/login');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      // An error occurred while checking authentication, redirect to login page
      next('/login');
    }
  } else {
    // Route does not require authentication, allow access
    next();
  }
});

export default router
