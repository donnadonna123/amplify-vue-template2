<template>
  <authenticator
    :login-mechanisms="['email']"
       :social-providers="['google', 'facebook']"
    :sign-up-attributes="['email', 'given_name', 'family_name']"
  >
    <template #default="{ user, signOut }">
      <div  >
        
          <span>Welcome, {{ user.attributes?.email }}!</span><br>

           <LoginRedirectHandler :user="user" />
            <router-link  to="/Userhome">User Home</router-link><br>
          <button @click="signOut" class="sign-out-btn">Sign Out</button>
       
 
      </div>
    </template>
    
    <template #sign-in-header>
      <div class="custom-header">
        <h2>Welcome to My App</h2>
        <p>Please sign in to continue</p>
      </div>
    </template>
  </authenticator>
<p>After login </p>
  <img src="/images/Logininfo.jpg" alt="Login Info Image"  >
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import { useRouter } from 'vue-router';
import LoginRedirectHandler from '@/views/Userhome.vue'


</script>
<style>
.sign-out-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.sign-out-btn:hover {
  background: #c0392b;
}
</style>