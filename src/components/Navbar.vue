<!-- components/NavBar.vue -->
    <template>
      <nav class="navbar">
      
        <router-link class="nav-links" to="/">Home</router-link>
        <router-link class="nav-links" to="/whoweare">Who we are</router-link>
        <router-link class="nav-links" to="/Signup">Archived stories</router-link>
        <router-link class="nav-links" to="/Getstarted">Get started</router-link>       
        <router-link class="nav-links" to="/login">Login</router-link>
        <router-link class="nav-links" to="/Signup">Sign Up</router-link>
        <router-link class="nav-links" to="/Contact">Contact</router-link>  
        
        <router-link class="nav-links" to="/Uploadvideo">Upload video</router-link>                
        <router-link class="nav-links" to="/Todos">To do lists</router-link>      
  
        <!-- ... other navigation links -->
      </nav>
    
    </template>

   <script>
export default {
  name: 'Navbar',

}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 5px;
    
}

.nav-links {
  
   padding: 1px 5px;

}

.nav-links a {
  color: green;
  
}

.nav-links a:hover {
  color: green;
}
</style>