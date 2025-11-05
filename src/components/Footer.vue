<!-- src/components/AppFooter.vue -->
<template>
  <footer class="app-footer">
  <img src="/images/footer-logo.png" width="150" alt="Home Image"  ><br>
 <b>Quick Links: </b><br>
Home<br>
About Us or Who We Are<br>
How It Works<br>
Stories Archive<br>
Contact<br>
<b>Social Media Icons</b>: Facebook, Instagram, YouTube (optional).
<b>Contact Info</b>:
Email: 
Phone: <br>
<b>Copyright Notice</b>: 

  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
 
 
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  color: #42b883;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.footer-subtitle {
  color: #42b883;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-description {
  line-height: 1.6;
  opacity: 0.9;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-link {
  color: #ecf0f1;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.3s;
}

.footer-link:hover {
  opacity: 1;
  color: #42b883;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  color: #ecf0f1;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.3s;
}

.social-link:hover {
  opacity: 1;
  color: #42b883;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  text-align: center;
}

.copyright {
  margin: 0;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>