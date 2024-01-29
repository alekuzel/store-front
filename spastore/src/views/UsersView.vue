<template>
  <div class="max-w-3xl mx-auto mt-8 p-4">
    <h1 class="text-3xl font-semibold mb-4">Användare</h1>

    <div v-for="user in users" :key="user.id" class="user-card">
      <div v-if="editingUserId !== user.id">
        <div class="user-name">{{ user.name }} {{ user.lastname }}</div>
        <div class="user-email">{{ user.email }}</div>
        <div class="user-role">{{ user.role }}</div>
      </div>

      <div v-else>
        <label class="form-label">Name: <input v-model="editedUser.name" class="form-input" /></label>
        <label class="form-label">Lastname: <input v-model="editedUser.lastname" class="form-input" /></label>
        <label class="form-label">Email: <input v-model="editedUser.email" type="email" class="form-input" /></label>
        <label class="form-label">Role: <input v-model="editedUser.role" class="form-input" /></label>
      </div>
      <div>
  <button v-if="isAdmin && editingUserId !== user.id" @click="editUser(user)" class="edit-button">Redigera</button>
  <button v-if="isAdmin && editingUserId === user.id" @click="saveEditedUser(user)" class="add-user-button">Spara</button>
  <button v-if="isAdmin && editingUserId === user.id" @click="cancelEdit" class="delete-button">Avbryt</button>
  <button v-if="isAdmin && editingUserId !== user.id" @click="deleteUser(user.id)" class="delete-button">Radera</button>
</div>
    </div>

    <form v-if="isAdmin" @submit.prevent="addUser" class="add-user-form">
      <label class="form-label">Name: <input v-model="newUser.name" class="form-input" /></label>
      <label class="form-label">Lastname: <input v-model="newUser.lastname" class="form-input" /></label>
      <label class="form-label">Email: <input v-model="newUser.email" type="email" class="form-input" /></label>
      <label class="form-label">Role: <input v-model="newUser.role" class="form-input" /></label>
      <label class="form-label">Password: <input v-model="newUser.password" type="password" class="form-input" /></label>
      <button type="submit" class="add-user-button">Add User</button>
    </form>
  </div>
</template>

<script>
import { FetchUserDetailsMixin } from '@/mixins/mixins';
export default {
  mixins: [FetchUserDetailsMixin],
  name: 'UsersView',
  data() {
    return {
      role: '',
      token: '',
      users: [], // Array to store users
      newUser: {
        name: '',
        lastname: '',  
        email: '',
        role: '',
      },
      editingUserId: null,  // Add this line
    editedUser: {        // Add this line
      name: '',
      lastname: '',
      email: '',
      role: '',
    },
    };
  },
  computed: {
    isAdmin() {
      // Replace this logic with your actual authentication check for admin role
      return this.role === 'admin';
    },
  },
  methods: {
  getUserRole() {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
    return payload.role;
   
  }
  return null;
},
    //load user data - this is what all uses will see on the users page
    async loadUsers() {

      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();
      console.log('Response from API:', data);
      this.users = data.map(user => ({
        ...user,
      }));
    },
     //cancel editing
    cancelEdit() {
    this.editingUserId = null;
    this.editedUser = {};
  },
  
    // Method to add a new user for admin users
   async addUser() {
      const formData = new FormData();
    
    formData.append("name", this.newUser.name);
    formData.append("lastname", this.newUser.lastname);
    formData.append("email", this.newUser.email);
    formData.append("role", this.newUser.role);
    formData.append("password", this.newUser.password);

try {
  // Specify the URL of the API where the POST request will be sent
  const response = await fetch("http://127.0.0.1:8000/users", {
    method: "POST",
    body: formData,
  });

  // Parse the received response
  const data = await response.json();
  console.log('Response:', data);

  // Clear form fields after submission
  this.newUser.name = '';
  this.newUser.lastname = '';
  this.newUser.email = '';
  this.newUser.role = '';
  this.newUser.password = '';
  this.loadUsers();

} catch (error) {
  console.error('Error:', error);
}
    },
    editUser(user) {
      // Set the user data to be edited
      this.editingUserId = user.id;
      this.editedUser = { ...user };
    },
    async saveEditedUser(user) {
      try {
        // Your existing code for saving the edited user
        const response = await fetch(`http://127.0.0.1:8000/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editedUser),
        });

        const data = await response.json();
        console.log('Edited User:', data);

        // Reset the editingUserId and reload users
        this.editingUserId = null;
        this.loadUsers();
      } catch (error) {
        console.error('Error editing user:', error);
      }
    },    async deleteUser(userId) {
      try {
        // Fetch URL of the API along with the ID of the item which is to be deleted
        await fetch("http://localhost:8000/users/" + userId, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            
          },
        });

        // Call getItems() method after the item is removed to update the table
        this.loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
  mounted() {
    // Load users when the component is mounted
    this.loadUsers();
    const token = JSON.parse(localStorage.getItem('token')) || {};
    const userId = token.tokenable_id;
    this.fetchUserDetails(userId)
    .then((userData) => {
      if (userData && userData.role) {
        this.role = userData.role;
        console.log('User role:', this.role); // Log the role for debugging
      } else {
        console.error('User data or role is missing:', userData);
      }
    })
    .catch((error) => {
      console.error('Error fetching user details:', error);
    });
  },
};
</script>

<style scoped>


.user-card {
  @apply bg-white p-4 rounded shadow-md mb-4;
}

.user-name {
  @apply text-lg font-semibold mb-2;
}

.user-email,
.user-role {
  @apply text-gray-600 mb-2;
}

.edit-button,
.delete-button {
  @apply bg-blue-500 text-white px-4 py-2 rounded mr-2;
}

.delete-button {
  @apply bg-red-500;
}

.add-user-form {
  @apply bg-white p-4 rounded shadow-md mb-4;
}

.form-label {
  @apply block mb-2;
}

.form-input {
  @apply border border-gray-300 px-3 py-2 rounded w-full;
}

.add-user-button {
  @apply bg-green-500 text-white px-4 py-2 rounded;
}
</style>
