<template>
  <div>
    <h1>User Home-My story</h1>
    <p>Welcome, {{ userName }}!</p>
    <button @click="handleSignOut">Sign Out</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCurrentUser, fetchUserAttributes, signOut } from 'aws-amplify/auth';

// State for user name
const userName = ref<string>('User');
const router = useRouter();

// Fetch user data on mount
const fetchUser = async () => {
  try {
    await getCurrentUser(); // Verify user is authenticated
    const attributes = await fetchUserAttributes();
    const givenName = attributes.given_name || '';
    const familyName = attributes.family_name || '';
    userName.value = `${givenName} ${familyName}`.trim() || 'User';
  } catch (error) {
    console.error('Error fetching user:', error);
    router.push('/login'); // Redirect to login if not authenticated
  }
};

// Handle sign-out
const handleSignOut = async () => {
  try {
    await signOut();
    userName.value = 'User';
    router.push('/login');
  } catch (error) {
    console.error('Sign-out error:', error);
  }
};

// Call on component mount
onMounted(fetchUser);
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}
</style>