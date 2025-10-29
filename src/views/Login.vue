<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Sign In</h2>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <PasswordToggle
          id="password"
          v-model="password"
          placeholder="Enter your password"
          class="form-input"
          required
        />
      </div>

      <button type="submit" class="login-button" :disabled="loading">
        {{ loading ? 'Signing In...' : 'Sign In' }}
      </button>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import PasswordToggle from '@/components/PasswordToggle.vue';

export default {
  name: 'Login',
  components: {
    PasswordToggle
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = '';
      
      try {
        const user = await Auth.signIn(this.email, this.password);
        console.log('Login successful:', user);
        
        // Redirect or emit success event
        this.$emit('login-success', user);
        
      } catch (error) {
        console.error('Login error:', error);
        this.error = this.getErrorMessage(error);
      } finally {
        this.loading = false;
      }
    },
    
    getErrorMessage(error) {
      switch (error.code) {
        case 'UserNotFoundException':
          return 'User not found. Please check your email.';
        case 'NotAuthorizedException':
          return 'Incorrect password. Please try again.';
        case 'UserNotConfirmedException':
          return 'Please confirm your email address before signing in.';
        default:
          return error.message || 'An error occurred during sign in.';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
}

.login-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.login-button:hover:not(:disabled) {
  background: #0056b3;
}

.login-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
  padding: 10px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>