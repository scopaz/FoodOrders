import { createRouter, createWebHistory } from '@ionic/vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomeView.vue'
import AboutPage from '../views/AboutView.vue'
import AdminView from '../views/AdminView.vue'
import {checkAuth} from "../api/foodOrders.api"
import Tab from '../components/Tab.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      component: Tab,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomePage,
          meta: { requiresAuth: true } // Add this meta property to indicate the route requires authentication
        },
        {
          path: '/admin',
          name: 'admin',
          component: AdminView,
          meta: { requiresAuth: true, requiresAdmin: true } // Add this meta property to indicate the route requires authentication and admin role
        }
      ]
    },
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
      const isAdmin = response.data.isAdmin;
      if(authenticated){
        if(to.meta.requiresAdmin && isAdmin){
          next();
        }
        else if(to.meta.requiresAdmin && !isAdmin){
          next('/home');
        }else {
          next();
        }
      }
      else {
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
