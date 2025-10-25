<!-- src/components/Whoweare.vue -->
<template>
  <div>
  <img src="/images/whoweare.jpg" alt="Whoweare Image"  >

    <Navbarwhoweare />
    <h1>our team</h1>
  <section class="hero fade-in">
        <img src="" alt="victor was here">
        <div class="hero-overlay"></div>
        <h1>Every migrant family <span style="color:violet">authors</span> history's untold chapters.</h1>
    </section>
    <section class="our-team who-we-are fade-in section-margin-top section-margin-bottom">
        <div class="tabs">
            <a href="/who-we-are/our-mission.html" class="tab">Our Mission</a>
            <a href="/who-we-are/our-story.html" class="tab">Our Story</a>
            <span class="tab active">Our Team</span>
        </div>
         <div class="team-content content fix-width">
            <div class="team-member-content">
                <div class="left">
                    <div class="member fade-in">
                        <h3>Faith Chao</h3>
                        <p>The instigator, the one who conceived the idea and the  overall concept of this project. </p>
                    </div>
                    <div class="member fade-in">
                        <h3>Winnie Wong</h3>
                        <p>The ‘CEO’, the one who organizes, manages and impliment the entire operation.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>Nancy Mackay</h3>
                        <p>Our oral history guru. Our expert content consultant.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>Donna Yeung</h3>
                        <p>Member of technical team, responsible for archiving and database.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>Sam Chao</h3>
                        <p>Member of technical team, Website developer.</p>
                    </div>
                </div>
                <div class="right">
                    <div class="member fade-in">
                        <h3>Victor Xu</h3>
                        <p>Technical team.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>Chang Chen</h3>
                        <p>Our legal consultant.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>Jerry Xu</h3>
                        <p>Head of our technical team in charge of transcription.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>xxxx</h3>
                        <p>Our website designer.</p>
                    </div>
                    <div class="member fade-in">
                        <h3>xxxxx</h3>
                        <p>Website coordinator and responsible for content review.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

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