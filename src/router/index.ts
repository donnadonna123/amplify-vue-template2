// src/router/index.ts
import { createRouter, createWebHistory} from 'vue-router';
 
import Layout from "@/layouts/layout.vue";

// Import your page components

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Userhome from "@/Components/Userhome.vue";
import Whoweare from "@/views/Whoweare.vue";
import Whowearestory from "@/views/Whowearestory.vue";
import Whoweareteam from "@/views/Whoweareteam.vue";
import Todos from "@/views/Todos.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Uploadvideo from "@/views/Uploadvideo.vue";

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
        path: '/whoweare',
        name: 'whoweare',
        component: Whoweare
      },
      {
        path: '/whowearemission',
        name: 'whowearemission',
        redirect: Whoweare
      },
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
      {
          path: '/Uploadvideo',
          name: 'Uploadvideo',
          component: Uploadvideo
      },
      {
          path: '/Todos',
          name: 'Todos',
          component: Todos
      },
 
       {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/ResetPassword',
        name: 'ResetPassword',
        component: ResetPassword
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '/Userhome',
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
//      next('login');
    }
  } else {
    next();
  }
});

export default router;