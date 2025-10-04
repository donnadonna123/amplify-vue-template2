<!-- src/components/Navbar.vue -->
<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// No additional script logic needed
</script>

<style scoped>
nav {
  background-color: #2c3e50;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
}
li {
  display: inline;
}
a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}
a:hover {
  color: #42b983;
}
.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}
</style>