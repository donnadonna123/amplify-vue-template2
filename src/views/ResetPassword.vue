<script setup lang="ts">
import { ref } from 'vue'
import { initiateResetPassword, confirmPasswordReset } from '@/composables/useResetPassword'
import { useRouter } from 'vue-router'

const email = ref('')
const code = ref('')
const newPassword = ref('')
const step = ref<'init' | 'confirm'>('init')
const message = ref('')
const router = useRouter()

const handleInitiate = async () => {
  message.value = await initiateResetPassword(email.value);
  step.value = 'confirm';
}

const handleConfirm = async () => {
  message.value = await confirmPasswordReset(email.value, code.value, newPassword.value)
  if (message.value === 'Password successfully reset.') {
    // Redirect to login page
    message.value = 'Redirecting to login...';
    router.push('/Login');
  }

  
}

 
</script>

<template>
  <div>
    <div v-if="step === 'init'">
      <input v-model="email" placeholder="Enter your email" />
      <button @click="handleInitiate">Send Reset Code</button>
    </div>

    <div v-else>
      <input v-model="code" placeholder="Enter confirmation code" />
      <input v-model="newPassword" type="password" placeholder="New password" />
      <button @click="handleConfirm">Reset Password</button>
    </div>

    <p>{{ message }}</p>


  </div>
</template>
