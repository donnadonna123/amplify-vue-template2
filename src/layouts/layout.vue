<!-- src/layouts/Layout.vue -->
<template>
  <div class="default-layout">
    <Header />
    <main class="main-content">
      <div class="container">
        
          <router-view /> <!-- Child routes render here -->
         
        
      </div>
    </main>
    <Footer />
  </div>
</template>


<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import { useRoute } from 'vue-router';

  
export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
  },

};

 
</script>
