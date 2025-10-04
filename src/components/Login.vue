<!-- src/components/Login.vue -->
<template>
  <div>
    <h1>Login Page</h1>
    <authenticator
      :sign-up-attributes="[
        'given_name',
        'family_name',
        'phone_number',
        'birthdate',
        'gender',
        'locale',
        'profile_picture'
      ]"
    >
      <template v-slot="{ signOut }">
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
</style>