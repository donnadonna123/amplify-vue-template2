<!-- src/components/Whoweare.vue -->
<template>
  <div>
  <img src="/images/getstarted.jpg" alt="Whoweare Image"  >
  
    <h1>Get started</h1>


 <p>Our <b>Guiding Principle</b> is that these interviews and other family records <b>reflect the perspectives</b> of the interviewees and their family. While the interview files are archived by the Evergreen Family Stories System, the family—particularly the interviewee—<b>retains control</b> over who, aside from the system admin, can access the files and under what circumstances.</p>
  
  <p>Build your family story by one or more of the following: </p>
  <h2>Interview a Family Member</h2>
  <p>Choose a family member whose story you would like to know more about, obtain his/her consent, do the interview offline, record the audio/video with your smart phone or other recording device you are comfortable with or do the interview remotely and online using any audio/video conferencing tool such as zoom which can record the narrator’s audio/video. [Download our guide].</p>
  <p>Afterward, you will review the interview and provide us with keywords and a short summary. Tools will be provided for you to transcribe your interview. You will also be asked to provide a few keywords. Have your interviewee go over the transcripts with you to help rectify and proof-read the interview, making sure it is a faithful record of your interview.</p>
<p><b>I want to try this option [Button]</b>(In each of these I want to try buttons, please take them to a sign up page first</p>
 
<h2>Record Your Own Story</h2>
<p>You can also record your own story. After recording your own story, please give us keywords and a short summary. Try your best to transcribe the audio/video if you can, leveraging transcribing tools</p>
<p>Once you have completed your recording, consider gathering any relevant photos or documents that complement your narrative to further enrich your family’s legacy. Upload these materials alongside your story, ensuring they are preserved for future generations. Additionally, explore our resources to help guide you through the interview or storytelling process, and when you’re ready, share your story with loved ones or contribute it to our archive to inspire others and celebrate your family’s unique journey.</p>
<p><b>I want to try this option [Button]</b></p>

<h2>Upload photos or documents of your family</h2>
<p>If you have important photos and documents which can enhance your family story, you can upload copies and save them for future generations.</p>
<p><b>I want to try this option [Button]</b></p>

<h2>Sign up:</h2>

<p>Please provide a log in with a drop down table of </p>
<router-link  to="/Login">Login</router-link><br>
<p></p>

<h2>Please provide a log in with a drop down table of </h2>
<p>Once they have logged in, please show the a star graph of the interviews they have done, one as the interviewee and one as the interviewer. The logged inn person is at the center with lines from the center to those they have interviewed or have been interviewed by. If you click on that person than the relationship shows up.</p>
 
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