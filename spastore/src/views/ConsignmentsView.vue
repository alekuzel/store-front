<template>
    <div class="max-w-3xl mx-auto mt-8 p-4">
      <h1 class="text-3xl font-semibold mb-4">Varupartier</h1>
  
      <div v-for="consignment in consignments" :key="consignment.id" class="consignment-card">
        <div>
          <span v-if="editingConsignment === consignment.id">
            Partinummer: <input v-model="consignment.cons_nr" class="form-input" />
          </span>
          <span v-else>Partinummer: {{ consignment.cons_nr }}</span>
        </div>
        <div>
          <span v-if="editingConsignment === consignment.id">
            Leverantör: <input v-model="consignment.supplier" class="form-input" />
          </span>
          <span v-else>Leverantör: {{ consignment.supplier }}</span>
        </div>
        <div>
          <span v-if="editingConsignment === consignment.id">
            Bäst-före datum: <input v-model="consignment.expiry_date" type="date" class="form-input" />
          </span>
          <span v-else>Bäst-före datum: {{ consignment.expiry_date }}</span>
        </div>
  
        <div v-if="editingConsignment === consignment.id">
          <button @click="saveEditedConsignment(consignment)" class="add-consignment-button">Spara</button>
          <button @click="toggleEdit(null)" class="edit-button">Avbryt</button>
        </div>
        <div v-else>
          <button @click="toggleEdit(consignment.id)" class="edit-button">Redigera</button>
          <button @click="deleteConsignment(consignment.id)" class="delete-button">Radera</button>
        </div>
      </div>
  
      <form @submit.prevent="addConsignment" class="add-consignment-form">
        <label class="form-label">Partinummer: <input v-model="newConsignment.cons_nr" class="form-input" /></label>
        <label class="form-label">Leverantör: <input v-model="newConsignment.supplier" class="form-input" /></label>
        <label class="form-label">Bäst-före datum: <input v-model="newConsignment.expiry_date" type="date" class="form-input" /></label>
        <button type="submit" class="add-consignment-button">Spara</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConsignmentsView',
    data() {
      return {
        consignments: [], // Array to store consignments
        newConsignment: {
          cons_nr: '',
          supplier: '',  
          expiry_date: '',
        },
        editingConsignment: null, // Track the consignment being edited
      };
    },
 
    methods: {

      //load user data - this is what all uses will see on the users page
      async loadConsignments() {
  
        const response = await fetch("http://localhost:8000/consignments");
        const data = await response.json();
        console.log('Response from API:', data);
        this.consignments = data.map(consignment => ({
          ...consignment,
        }));
      },
    
      // Method to add a new user for admin users
     async addConsignment() {
        const formData = new FormData();
      
      formData.append("expiry_date", this.newConsignment.expiry_date);
      formData.append("supplier", this.newConsignment.supplier);
      formData.append("cons_nr", this.newConsignment.cons_nr);
  
  try {
    // Specify the URL of the API where the POST request will be sent
    const response = await fetch("http://127.0.0.1:8000/consignments", {
      method: "POST",
      body: formData,
    });
  
    // Parse the received response
    const data = await response.json();
    console.log('Response:', data);
  
    // Clear form fields after submission
    this.newConsignment.expiry_date = '';
    this.newConsignment.supplier = '';
    this.newConsignment.cons_nr = '';
    this.loadConsignments();
  
  } catch (error) {
    console.error('Error:', error);
  }
      },

      async deleteConsignment(id) {
        try {
          // Fetch URL of the API along with the ID of the item which is to be deleted
          await fetch("http://localhost:8000/consignments/" + id, {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
              
            },
          });
  
          // Call getItems() method after the item is removed to update the table
          this.loadConsignments();
        } catch (error) {
          console.error('Error deleting consignment:', error);
        }
      },
     toggleEdit(consignmentId) {
      // Toggle the editing state for the clicked consignment
      this.editingConsignment = this.editingConsignment === consignmentId ? null : consignmentId;
    },
      // Method to edit a user for admin users
     async editConsignment() {
        
      },
      // Method to delete a user for admin users
   
      async saveEditedConsignment(consignment) {
      // Update the consignment on the server
      try {
        const response = await fetch(`http://127.0.0.1:8000/consignments/${consignment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(consignment),
        });

        const data = await response.json();
        console.log('Edited Consignment:', data);

        // Reset the editingConsignment and reload consignments
        this.editingConsignment = null;
        this.loadConsignments();
      } catch (error) {
        console.error('Error editing consignment:', error);
      }
    },
    },
    mounted() {
      // Load users when the component is mounted
      this.loadConsignments();
     

    },
  };
  </script>
  
  <style scoped>
  
  .consignment-card {
    @apply bg-white p-4 rounded shadow-md mb-4;
  }
  
  .cons-number {
    @apply text-lg font-semibold mb-2;
  }
  
  .cons-supplier,
  .cons-exp {
    @apply text-gray-600 mb-2;
  }
  
  .edit-button,
  .delete-button {
    @apply bg-blue-500 text-white px-4 py-2 rounded mr-2;
  }
  
  .delete-button {
    @apply bg-red-500;
  }
  
  .add-consignment-form {
    @apply bg-white p-4 rounded shadow-md mb-4;
  }
  
  .form-label {
    @apply block mb-2;
  }
  
  .form-input {
    @apply border border-gray-300 px-3 py-2 rounded w-full;
  }
  
  .add-consignment-button {
    @apply bg-green-500 text-white px-4 py-2 rounded;
  }
  </style>
  