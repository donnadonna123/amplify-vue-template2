<!-- src/components/Whowearestory.vue -->
<template>
  <div style="margin: auto; width: 80%;">
  <img style="margin: auto; width: 100%;" src="/images/whoweare1.jpg" alt="Whoweare Image"  >

    <Navbarwhoweare />
    <h1>Our Story</h1>
<p>Our Story of doing Oral History started in 2009 with a PBL(Project Based Learning) program of small projects in Western China. (use drop down links for the following)</p>
 
 <ol style="text-align: left;">
  <li>Teachers guided students to interview their elders in rural western part of China. See <router-link  to="/Huangstory">Student Huang’s story</router-link>. (see below)</li>
  <li>Many people joined our program in unexpected ways. <router-link  to="/Login">See Clara’s story</router-link>.</li>
  <li>Once involved in doing oral history <router-link  to="/Changyustory">Zhang Yu</router-link>(EEF’s China program director 2009-2017) has made this her life work.</li>
  <li>See <router-link  to="/Faithstory">Faith Chao’s story</router-link>(founder and president of EEF from 2001 – 2017) on how this Family Stories project was conceived.</li>
 </ol>
  </div>
</template>


<script setup>
  import { useRouter } from 'vue-router';
  import Navbarwhoweare from '../components/Navbarwhoweare.vue'
  
 
   
 
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
</style>