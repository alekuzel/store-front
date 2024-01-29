<!-- Start page -->
<template>
     <div>
    <h1>Hello, {{ name }} {{ lastname }}!</h1>
    <p>Today is {{ formattedDate }}.</p>
    <button @click="showToken">Show Token</button>
  </div>
  </template>
  
  <script>
  export default {
    name: 'StartView',
    data() {
    return {
      name: '',
      lastname: '', // Retrieve the user's name from storage
      formattedDate: '', // Store the formatted date and time
      token: '',
      role: '',
    };
  },
  mounted() {
    // Retrieve user's name and lastname separately
    console.log('Component is mounted!');
  const token = JSON.parse(localStorage.getItem('token')) || {};
  const userId = token.tokenable_id;
  console.log('User ID:', userId);
  // Format and display the current date and time in Swedish format
  this.formattedDate = this.getSwedishDateTime();
  this.token = localStorage.getItem('token');
  this.fetchUserDetails(userId);
  },
  methods: {
    getSwedishDateTime() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Stockholm',
      };
      
      const swedishDate = new Date().toLocaleDateString('sv-SE', options);
      return swedishDate;
      
    },
    async fetchUserDetails(userId) {
      try {
        // Make a request to your backend to get user details
        const response = await fetch(`http://localhost:8000/users/${userId}`);
        
        const userData = await response.json();

        // Set the user's name in the component data
        this.name = userData.name || 'Guest';
        this.lastname = userData.lastname || 'Guest';
        this.role = userData.role;
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    showToken(){
      
      const token = localStorage.getItem('token');
  console.log('token', token);
    },

  },
};
</script>
  
  <style scoped>
 h1{
  padding-top: 5vh;
 }
  </style>
  