// src/router/index.ts
import { createRouter, createWebHistory} from 'vue-router';
import { getCurrentUser } from 'aws-amplify/auth';

import Layout from "@/layouts/layout.vue";

// Import your page components

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Whoweare from "@/views/Whoweare.vue";
import Whowearestory from "@/views/Whowearestory.vue";
import Whoweareteam from "@/views/Whoweareteam.vue";
import Todos from "@/views/Todos.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Uploadvideo from "@/views/Uploadvideo.vue";
import Xyz from "@/views/Xyz.vue";
import Getstarted from "@/views/Getstarted.vue";
import Contact from "@/views/Contact.vue";
import Archivedstories from "@/views/Archivedstories.vue";
import Faithstory from "@/views/Faithstory.vue";
import Clarastory from "@/views/Clarastory.vue";
import Changyustory from "@/views/Changyustory.vue";
import Huangstory from "@/views/Huangstory.vue";





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
          path: '/Xyz',
          name: 'Xyz',
          component: Xyz
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
          path: '/Faithstory',
          name: 'Faithstory',
          component: Faithstory
      },
         {
          path: '/Clarastory',
          name: 'Clarastory',
          component: Clarastory
      },
          {
          path: '/Huangstory',
          name: 'Huangstory',
          component: Huangstory
      },
      {
          path: '/Changyustory',
          name: 'Changyustory',
          component: Changyustory
      },
      {
          path: '/Archivedstories',
          name: 'Archivedstories',
          component: Archivedstories
      },
      {
          path: '/Getstarted',
          name: 'Getstarted',
          component: Getstarted
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
        path: '/contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: '/Userhome',
        name: 'Userhome',
        component: () => import('../views/Userhome.vue'),
        meta: { requiresAuth: true },
      },
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
      // allow to access
      next();
    } catch (error) {
      
      next('/login');
    }
  } else {
    next();
  }
});

export default router;