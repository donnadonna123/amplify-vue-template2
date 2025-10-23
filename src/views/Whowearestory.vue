<!-- src/components/Whowearestory.vue -->
<template>
  <div>
  <img src="/images/whoweare.jpg" alt="Whoweare Image"  >
    <h1>Our Story</h1>
    <Navbarwhoweare />

 <ol>
 <li>Our Story of doing Oral History started in 2009 with a PBL(Project Based Learning) program of small projects in Western China.</li>
  <li>Teachers guided students to interview their elders in rural western part of China. See Yi’s story</li>
  <li>Many people joined our program in unexpected ways. See Clara’s story</li>
  <li>Once involved in doing oral history Zhang Yu(EEF’s China program director 2009-2017) has made this her life work. </li>
  <li>See Faith Chao’s (founder and president of EEF from 2001 – 2017)story on how this Family Stories project was conceived. </li>
 </ol>
  </div>
</template>


<script setup>
  import Navbarwhoweare from '../components/Navbarwhoweare.vue'
 
</script>

<style scoped>
h1 {
  color: #2c3e50;
}
</style>