<!-- src/App.vue -->


<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from './layouts/Layout.vue';
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