<!--form for adding new products-->
<template>
  <!-- on submitting the form, the addProduct method will be called -->
  <form @submit.prevent="addProduct()" class="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md" enctype="multipart/form-data">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4">
        <label for="name" class="text-sm font-semibold text-gray-600">Produktnamn</label>
        <input v-model="name" type="text" id="name" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="price" class="text-sm font-semibold text-gray-600">Pris</label>
        <input v-model="price" type="text" id="price" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="weight" class="text-sm font-semibold text-gray-600">Vikt</label>
        <input v-model="weight" type="text" id="weight" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="quantity" class="text-sm font-semibold text-gray-600">Antal</label>
        <input v-model="quantity" type="text" id="quantity" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="description" class="text-sm font-semibold text-gray-600">Beskrivning</label>
        <input v-model="description" type="text" id="description" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="category" class="text-sm font-semibold text-gray-600">Kategori</label>
        <input v-model="category" type="text" id="category" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      <div class="mb-4">
        <label for="consignment_id" class="text-sm font-semibold text-gray-600">Varuparti</label>
        <input v-model="consignment_id" type="text" id="consignment_id" class="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
      </div>

      
    </div>

    <div class="mb-4">
      <input type="submit" value="Spara" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">
    </div>
  </form>
</template>


<script>
export default {
  data() {
    return {
      name: '',
      price: '',
      weight: '',
      quantity: '',
      description: '',
      category: '',
      consignment_id: ''
    };
  },
  methods: {
       
    async addProduct() {
  // Create a FormData object to handle file uploads
  const formData = new FormData();
  formData.append("name", this.name);
  formData.append("price", this.price);
  formData.append("weight", this.weight);
  formData.append("quantity", this.quantity);
  formData.append("description", this.description);
  formData.append("category", this.category);
  formData.append("consignment_id", this.consignment_id);

  try {
    // Specify the URL of the API where the POST request will be sent
    const response = await fetch("http://127.0.0.1:8000/items", {
      method: "POST",
      body: formData,
    });

    // Parse the received response
    const data = await response.json();
    console.log('Response:', data);

    // Clear form fields after submission
    this.name = '';
    this.price = '';
    this.weight = '';
    this.quantity = '';
    this.description = '';
    this.category = '';
    this.consignment_id = '';


    this.$emit("productAdded");
  } catch (error) {
    console.error('Error:', error);
  }
}
},

 
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
