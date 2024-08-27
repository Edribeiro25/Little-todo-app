
<template>
    <div id="app">
      <nav class="navbar">
        <button class="toggle-button" @click="toggleSidebar">
          {{ sidebarVisible ? '<<<' : '>>>' }}
        </button>
        <div class="sidebar" :class="{ hidden: !sidebarVisible }">
        <div class="add-item">
            <button @click="addItem">Ajouter</button>
            <input type="text" v-model="newItem" placeholder="Ajouter une List" />
        </div>
        <ul>
          <li v-for="item in items" :key="item.id">
            <span class="item-name" @click="handleClick(item)">{{ item.title }}</span>
            <button class="delete-button" @click="handleDelete(item)">X</button>
          </li>
        </ul>
        <Modal v-if="isModalVisible" @close="hideModal">
          <form @submit.prevent="addItem">
            <label for="name">Nom:</label>
            <input type="text" id="name" v-model="newItem" />
            <button type="submit">Ajouter</button>
          </form>
        </Modal>
      </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const items = ref([{ title : 'Item 1' },{ title : 'Item 2' },{ title: 'Item 3' }]);
  const sidebarVisible = ref(true);
  const isModalVisible = ref(false);
  const newItem = ref('');
  
  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value;
  };
  
  const handleClick = (item) => {
    console.log('Clicked item:', item);
    // Implement your logic here, e.g., navigate to a detail page
  };
  
  const handleDelete = (item) => {
    items.value = items.value.filter(i => i !== item);
  };
  
  const addItem = () => {
    if (newItem.value.trim() !== '') {
      items.value.push({ id: Date.now(), title: newItem.value });
      newItem.value = '';
      hideModal();
    }
  };
  
  const hideModal = () => {
    isModalVisible.value = false;
  };
  </script>

<style>
/* Ajoutez ces styles pour gérer le dépassement de texte */
.sidebar li span:hover {
    color: #0056b3;
}
.element-name {
    max-width: calc(100% - 60px); 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: middle;
}

#List {
    display: flex;
    position: relative;
    justify-content: center;
}

.add-item {
    display: flex;
    direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.toggle-button {
    background-color: #20d70b;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    z-index: 1000;
}

.toggle-button:hover {
    background-color: #0056b3;
}

.sidebar {
    background-color: #f8f9fa;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    padding-top: 60px; /* Adjust padding to make space for the toggle button */
}

.sidebar.hidden {
    transform: translateX(-120%);
}

.add-button {
    display: block;
    margin: auto;
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
}

.add-button:hover {
    background-color: #218838;
}

.sidebar ul {
    list-style-type: none;
    justify-content: center;
    padding: 0;
    margin-top: 20px; /* Add margin to separate the list from the add button */
}

.sidebar li {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sidebar li button {
   background-color: crimson;
}

.sidebar li span {
    flex-grow: 1;
}

.sidebar button {
    background-color: #0066ff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 3px;
}

.sidebar button:hover {
    background-color: #0056b3;
}
</style>