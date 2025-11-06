<!-- src/components/Home.vue -->
<template>
  <div>
  
    <img src="/images/home.png" alt="Home Image"  >
  
    <h1>Welcome to the Home Page!!</h1>
    <p>We provide a unique opportunity for families of the Chinese Diaspora to preserve their immigrant experiences. This is a space where family members interview one another, ensuring that the narrative of their family's journey remains authentic and firmly in their hands. It's a place where families take control of their own stories, creating a lasting legacy for future generations. is that these interviews and
other family records <b>reflect the perspectives</b> of the interviewees and their family. 
</p>
<h2>Preserving the Immigrant Experience.</h2>

<!--    <h2>At Family Stories,</h2>   -->
<!--    <h3>We provide a unique opportunity </h3>   -->
<!--    <p>for families of the Chinese Diaspora to preserve their immigrant experiences. This is a space where family  -->
<!--      members interview one another, ensuring that the narrative of their family's journey remains authentic and firmly  -->
<!--      in their hands. It's a place where families take control of their own stories, creating a lasting legacy for   -->
<!--      future generations.</p>  
       
<!--       <img src="/images/principle.png" width="150" alt="Principle"   -->
 <!--     <p>is that these interviews and
other family records <b>reflect the perspectives</b> of the interviewees and their family. While the interview files are archived by the Evergreen Family Stories System, the family—particularly the interviewee—retains control over who, aside from the system admin, can access the files and under what circumstances. </p>
 -->  


<!-- <p>Your Family's Story, in Your Words. </p>  -->


<router-link  to="/Signup">Sign up</router-link><br>
  </div>
</template>

<script setup >

import { useRouter } from 'vue-router';

import Signup from '@/views/Signup.vue'

</script>




