// src/router/index.ts
import { createRouter, createWebHistory} from 'vue-router';
 
import Layout from "@/layouts/layout.vue";

// Import your page components

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Userhome from "@/views/Userhome.vue";
import Whoweare from "@/views/Whoweare.vue";
import Whowearestory from "@/views/Whowearestory.vue";
import Whoweareteam from "@/views/Whoweareteam.vue";


import { getCurrentUser } from 'aws-amplify/auth';



const routes = [
  {
    path: '/',
    component: Layout, // Use Layout as wrapper
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/Whoweare',
        name: 'Whoweare',
        component: Whoweare,
        children: [
          {
            path: '/Whoweareteam',
            name: 'Whoweareteam',
            component: Whoweareteam
          },
           {
            path: '/Whowearestory',
            name: 'Whowearestory',
            component: Whowearestory
          },
        ],
  
      },
      
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '/userhome',
        name: 'Userhome',
        component: Userhome,
        meta: { requiresAuth: true },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await getCurrentUser();
      next();
    } catch (error) {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;