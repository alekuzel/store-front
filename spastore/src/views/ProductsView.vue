<template>
  <div>
    <AddProductComponent @productAdded="getItems()" />
    <h2>Produkter</h2>
    <div>
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Produktnamn</th>
            <th class="py-2 px-4 border-b">Pris</th>
            <th class="py-2 px-4 border-b">Vikt</th>
            <th class="py-2 px-4 border-b">Antal</th>
            <th class="py-2 px-4 border-b">Beskriving</th>
            <th class="py-2 px-4 border-b">Kategori</th>
            <th class="py-2 px-4 border-b">Varuparti</th>
            <th class="py-2 px-4 border-b">Knappar</th>
          </tr>
        </thead>
        <tbody>
          <ProductsComp
            v-for="(item) in items"
            :key="item.id"
            :item="item"
            @deleteItem="deleteItem(item.id)"
            @editItem="toggleEditMode"
            @exitEditMode="exitEditMode"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import AddProductComponent from '../components/AddProductComponent.vue';
import ProductsComp from "../components/ProductsComp.vue";

export default {
  data() {
    return {
      items: ref([]),
      editingItemId: null,
    };
  },
  components: {
    ProductsComp,
    AddProductComponent,
  },
  methods: {
    // get items from the database
    async getItems() {
      const response = await fetch("http://localhost:8000/items");
      const data = await response.json();
      console.log('Response from API:', data);
      this.items = data.map(item => ({
        ...item,
        editMode: false,
      }));
    },
    async deleteItem(id) {
      
      try {
        // Fetch URL of the API along with the ID of the item which is to be deleted
        await fetch("http://localhost:8000/items/" + id, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            
          },
        });

        // Call getItems() method after the item is removed to update the table
        this.getItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },
    toggleEditMode(itemId) {
    // Find the item by ID and toggle its editMode
    const foundItem = this.items.find(item => item.id === itemId);
    if (foundItem) {
      foundItem.editMode = !foundItem.editMode;
    }
  },
  updateItem(index, updatedItem) {
    console.log('Handling editedItem event in parent:', updatedItem);
    this.$set(this.items, index, updatedItem);
  },
  exitEditMode(itemId) {
    // Find the item by ID and toggle its editMode
    const foundItem = this.items.find(item => item.id === itemId);
    if (foundItem) {
      foundItem.editMode = false;
    }
    this.getItems();
  },
  },
  

  mounted() {
    this.getItems();
  },
};
</script>

<style scoped>
/* Tailwind CSS classes for styling within the component */
.min-w-full {
  min-width: 80vw;
}

.bg-white {
  background-color: #fff;
}

.border {
  border-width: 1px;
}

.border-gray-300 {
  border-color: #e2e8f0;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.border-b {
  border-bottom-width: 1px;
}

/* Add more Tailwind CSS classes as needed */
</style>
