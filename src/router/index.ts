// src/router/index.ts
import { createRouter, createWebHistory} from 'vue-router';
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Userhome from "@/components/Userhome.vue";
import { getCurrentUser } from 'aws-amplify/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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