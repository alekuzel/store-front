<!-- Header.vue -->

<template>
    <header class="bg-gray-800 p-4">
      <!-- Header content goes here -->
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <router-link to="/" class="text-white font-bold text-lg">FOODER LOGO</router-link>
  
          <!-- Responsive navigation menu button -->
          <button @click="toggleMobileMenu" class="lg:hidden text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
  
          <!-- Responsive navigation menu -->
          <div v-show="isMobileMenuOpen" class="lg:hidden">
            <!-- Your mobile menu items go here -->
            <router-link to="/" class="block text-white py-2 px-4">Startsidan</router-link>
            <router-link to="/products" class="block text-white py-2 px-4">Produkter</router-link>
            <router-link to="/consignments" class="block text-white py-2 px-4">Varupartier</router-link>
            <router-link to="/users" class="block text-white py-2 px-4">Användare</router-link>
            <button v-if="isAuthenticated" @click="logout" class="text-white hover:underline">
        Logout
      </button>

          </div>
  
          <!-- Desktop navigation menu -->
          <div class="hidden lg:flex space-x-4">
            <!-- Your desktop menu items go here -->
            <router-link to="/" class="text-white">Startsidan</router-link>
            <router-link to="/products" class="text-white">Produkter</router-link>
            <router-link to="/consignments" class="text-white">Varupartier</router-link>
            <router-link to="/users" class="text-white">Användare</router-link>
            <button v-if="isAuthenticated" @click="logout" class="text-white hover:underline">
        Logout
      </button>

           
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMobileMenuOpen: false,
        isAuthenticated: false, // false if user is not logged in
      };
    },
    methods: {
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
      },
      logout() {
      // Clear the authentication token and redirect to the login page
      localStorage.removeItem('token');
      console.log('token removed')
      this.isAuthenticated = false;
      this.$router.push('/login');
      
    },
  },
  watch: {
    // Watch for changes in the route and update the authentication status
    $route() {
      this.isAuthenticated = localStorage.getItem('token') !== null;
    },
  },
};
</script>

  
  <style scoped>
  /* Add custom styling for the header if needed */
  </style>
  