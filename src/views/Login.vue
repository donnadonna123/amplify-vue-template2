
<template>
  <authenticator>
    <template v-slot:sign-in>
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

        <div>
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
    </template>
  </authenticator>
</template>

<script setup>
import { ref } from 'vue'
import { signIn } from 'aws-amplify/auth'
import { Authenticator } from '@aws-amplify/ui-vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSignIn = async () => {
  try {
    await signIn({ username: email.value, password: password.value })
    errorMessage.value = ''
    // Redirect or update UI
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
