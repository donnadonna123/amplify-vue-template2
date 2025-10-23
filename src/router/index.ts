// src/router/index.ts
import { createRouter, createWebHistory} from 'vue-router';
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import Userhome from "@/views/Userhome.vue";
import Whoweare from "@/views/Whoweare.vue";
import { getCurrentUser } from 'aws-amplify/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/whoweare',
    name: 'Whoweare',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
      path: '/userhome',
      name: 'Userhome',
      component: Userhome,
      meta: { requiresAuth: true },
    },
];

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