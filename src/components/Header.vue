<!-- src/components/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
      <img src="/images/logo.jpg" width="150" alt="Home Image"  >

      </div>

      <!-- Navigation -->
      <Navbar />
      <!-- Mobile Menu Button -->
      searching box
    
    </div>
  </header>
</template>

 

<script>
import Navbar from './Navbar.vue'

export default {
  name: 'Header',
  components: {
    Navbar
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.app-header {
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.5rem;
}

.logo-image {
  height: 40px;
  margin-right: 0.5rem;
}

.logo-text {
  color: #42b883;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

 

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
}
</style>