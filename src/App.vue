<!-- src/App.vue -->


<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Node env:', process.env.NODE_ENV)
  console.log('Vue version:', Vue.version)
})
</script>
 

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.content {
  margin-top: 60px; /* Prevent content from being hidden under fixed navbar */
}
</style>