<!-- src/layouts/Layout.vue -->
<template>
  <div class="default-layout">
    <Header />
    <main class="main-content">
      <div class="container">
        <main>
          <router-view /> <!-- Child routes render here -->
        </main>
        
      </div>
    </main>
    <Footer />
  </div>
</template>


<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';


export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
  },
   props: {
    user: {
      type: Object,
      default: null
    }
  }
};

 
</script>
