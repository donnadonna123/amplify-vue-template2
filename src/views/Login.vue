<template>
  <div class="login-container">
    <h2>Login</h2>
    <form v-if="!isAuthenticated" @submit.prevent="handleSignIn">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="formData.username"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="form-group">
          <PasswordToggle
          id="password"
          v-model="password"
          placeholder="Enter your password"
          class="form-input"
          required
        />
      </div>
      <button type="submit">Login</button>
      <p>
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
            <p>
       Forgot password? <router-link to="/ResetPassword">Reset Password</router-link>
      </p>
    </form>
    <p v-else>
      You are already logged in. <router-link to="/userhome">Go to User Home</router-link>
    </p>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import type { SignInInput } from 'aws-amplify/auth';
interface FormData {
  username: string;
  password: string;
}

import PasswordToggle from '@/components/PasswordToggle.vue';

export default defineComponent({
  name: 'Login',
  components: {
    PasswordToggle
  },
  data(): {
    formData: FormData;
    isAuthenticated: boolean;
    message: string;
  } {
    return {
      formData: {
        username: '',
        password: '',
      },
      isAuthenticated: false,
      message: '',
    };
  },
  async created() {
    await this.checkAuthState();
  },
  methods: {
    async checkAuthState() {
      try {
        await getCurrentUser();
        this.isAuthenticated = true;
        this.message = 'You are already authenticated.';
      } catch (error) {
        this.isAuthenticated = false;
        console.log('Not authenticated:', error);
      }
    },
    async handleSignIn() {
      try {
        const signInInput: SignInInput = {
          username: this.formData.username,
          password: this.formData.password,
        };
        const response = await signIn(signInInput);
        console.log('Sign-in response:', response);
        this.message = 'Login successful!';
        this.$router.push('/userhome');
      } catch (error: any) {
        this.message = `Login error: ${error.message || 'An error occurred'}`;
        console.error('Login error:', error);
      }
    },
  },
});
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 80px auto 20px; /* Offset for fixed navbar */
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.message {
  margin-top: 10px;
  color: #333;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>