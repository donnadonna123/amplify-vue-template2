<!-- src/components/AppHeader.vue -->
<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
      <h1>My Header</h1>

      </div>

      <!-- Navigation -->
           <nav>Navbar
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <!-- ... other navigation links -->
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </header>
</template>

<script >
import { ref } from 'vue'
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
import NavBar from '../components/NavBar.vue';
</script>

npm

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

.hamburger-line {
  width: 25px;
  height: 3px;
  background-color: #2c3e50;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
}
</style>