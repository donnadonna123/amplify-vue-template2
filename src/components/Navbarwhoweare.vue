<!-- components/NavBar.vue -->
    <template>
      <nav class="navbarw">
      
        <router-link class="nav-linkswho" to="/Whoweare">Our Mission</router-link>
        <router-link class="nav-linkswho" to="/Whowearestory">Our Story</router-link>
        <router-link class="nav-linkswho" to="/Whoweareteam">Our Team</router-link>      
        <!-- ... other navigation links -->
      </nav>
    
    </template>

   <script>
    export default {
    name: 'Navbarwhoweare',
    }
  </script>

<style scoped>
.navbarw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;

   
}

.nav-linkswho {
  
   padding: 1px 5px;

}

.nav-linkswho a {
  color: green;
  
}

.nav-links a:hover {
  color: green;
}
</style>