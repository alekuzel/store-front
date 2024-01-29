<!-- Log in component -->
<template>
    <div class="flex items-center justify-center h-screen">
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username:
          </label>
          <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password:
          </label>
          <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" required>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
  login() {
    // Call your API login endpoint using native fetch
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    })
    .then(response => {
      if (response.ok) {
        // Parse the JSON response
        return response.json();
      } else {
        // Handle other status codes
        throw new Error('Login error: ' + response.statusText);
      }
    })
    .then(data => {
      // Handle successful login, e.g., store token in local storage
      localStorage.setItem('token', JSON.stringify(data.token));
      // Redirect to the start page
      this.$router.push({ path: '/' }); // Adjust the path according to your route configuration
      console.log('token', data.token.tokenable_id);
    })
    .catch(error => {
      // Handle login error
      console.error('Login error:', error.message);
    });
  },
},

};
</script>