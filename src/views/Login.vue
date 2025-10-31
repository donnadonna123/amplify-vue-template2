<template>
<h1>Login</h1>
  
      <div v-if="checkingAuth" class="loading">
      Checking authentication...
    </div>
    
    <div v-else-if="isAuthenticated" class="already-logged-in">
      <h2>You're already logged in!</h2>
      <p>Redirecting to home page...</p>
      <router-link to="/Userhome"  >Go to your Home page</router-link>
    </div>
 
      <form @submit.prevent="handleSignIn">
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
          />
        </div>

        <div style="width: 50%; margin: auto;">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
            />
            <button type="button" @click="togglePassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <button type="submit">Sign In</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        
      </form>
  
        <p>
        Forgot Password <router-link to="/Resetpassword">Forgot password</router-link>
        Sign UP <router-link to="/Signup">Sign Up</router-link>
      </p>

</template>

<script setup>
import { ref } from 'vue'
import { signIn } from 'aws-amplify/auth'
import { Authenticator } from '@aws-amplify/ui-vue'
import { useRouter } from 'vue-router'
 

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSignIn = async () => {
  try {
    await signIn({ username: email.value, password: password.value })
    errorMessage.value = ''
    // Redirect or update UI
    router.push('/Userhome')
  } catch (error) {
    errorMessage.value = error.message || 'Login failed'
  }
}



</script>

<style scoped>
 
.password-wrapper {
  display: flex;
  align-items: center;
}
.password-wrapper input {
  flex: 1;
}
.password-wrapper button {
  margin-left: 8px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
