<template>
  <tr>
    <td v-if="!item.editMode">{{ item.name }}</td>
    <td v-else>
      <input v-model="editedItem.name" />
    </td>



    <td v-if="!item.editMode">{{ item.price }}</td>
    <td v-else>
      <input v-model="editedItem.price" class="edit-mode"/>
    </td>

    <td v-if="!item.editMode">{{ item.weight }}</td>
    <td v-else>
      <input v-model="editedItem.weight" class="edit-mode"/>
    </td>

    <td v-if="!item.editMode">{{ item.quantity }}</td>
    <td v-else>
      <input v-model="editedItem.quantity" class="edit-mode"/>
    </td>

    <td v-if="!item.editMode">{{ item.description }}</td>
    <td v-else>
      <input v-model="editedItem.description" class="edit-mode"/>
    </td>

    <td v-if="!item.editMode">{{ item.category }}</td>
    <td v-else>
      <input v-model="editedItem.category" class="edit-mode"/>
    </td>

    <td v-if="!item.editMode">{{ item.consignment_id }}</td>
    <td v-else>
      <input v-model="editedItem.consignment_id" class="edit-mode-cons"/>
    </td>


    <td>
  <button class="btn-red" @click="onDeleteItem">
    <i class="fas fa-trash-alt"></i>
  </button>
</td>

<td>
  <button
    class="btn-blue"
    :class="{ 'btn-green': item.editMode }"
    @click="onEditItem">
    <i v-if="item.editMode" class="fas fa-save"></i>
    <i v-else class="fas fa-edit"></i>
  </button>
</td>
  </tr>
</template>

<script>
export default {
  props: ['item'],
  emits: ['deleteItem', 'editItem', 'editedItem'],
  data() {
    return {
      editedItem: { ...this.item },
    };
  },
  methods: {
    onDeleteItem() {
      this.$emit('deleteItem', this.item.id);
    },
    onEditItem() {
  if (this.item.editMode) {
    // Save edits to the database
    this.saveEdits();
  } else {
    // Emit an event to inform the parent about the intention to edit
    this.$emit('editItem', this.item.id);
  }
},
saveEdits() {
  // Make an API call to update the item in the database
  // Adjust the URL and method as needed
  fetch(`http://localhost:8000/items/${this.item.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.editedItem),
  })
    .then(response => response.json())
    .then(() => {
      // Emit an event to inform the parent that the item has been edited
      this.$emit('editedItem', this.editedItem);//extra emit to inform parent component to toggle back from edit mode
      this.$emit('exitEditMode', this.item.id);
    })
    .catch(error => console.error('Error saving edits:', error));
},
  },
};
</script>


<style scoped>
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full;
}

.btn-red {
  @apply bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full;
}
.btn-green {
  @apply bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full;
}

.edit-mode {
    width: 6vw; /* will adjust more later*/
  }
.edit-mode-cons{
  width: 2vw;
}
</style>
