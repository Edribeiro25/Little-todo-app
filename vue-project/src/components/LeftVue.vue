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
      </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import {onMounted, ref } from 'vue';
  import axios from 'axios';
  import VueCookies from 'vue-cookies';
  import { defineEmits } from 'vue';

  const emit = defineEmits(['centerID']);
  const id = ref();
  const items = ref([]);
  const sidebarVisible = ref(true);
  const newItem = ref('');


  onMounted(() => {
    fetchList();
  });

  async function fetchList(){
    await axios.get(`http://localhost:3000/api/me`,
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => { id.value = res.data.id;})
    .catch(err => {console.log(err)})
    console.log(id.value)
    await axios.get(`http://localhost:3000/api/list/${id.value}`,
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => { items.value = res.data;})
    .catch(err => {console.log(err)})
  }
  
  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value;
  };
  
  const handleClick = (item) => {
    emit('centerID', item.id);
  };
  
async function handleDelete(item){
    console.log('Deleted item:', item.id);
    const delid = item.id;
    const url = `http://localhost:3000/api/deletelist/${delid}`;
    await axios.delete(url,
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => { console.log(res.data); items.value = items.value.filter(item => item.id !== delid);})
    .catch(err => {console.log(err)})
  };
  
  async function addItem() {
    if (newItem.value.trim() !== '') {
      await axios.post(`http://localhost:3000/api/addList`,
    { body:{
      title: newItem.value,
      userId: id.value
    }},
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => { items.value.push(res.data)})
    .catch(err => {console.log(err)})
    }
  };
</script>

<style scoped>
/* Ajoutez ces styles pour gérer le dépassement de texte */
.navbar {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between; /* Distribute content horizontally */
  color: white; /* White text color */
}

.toggle-button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 1000;
}

.toggle-button:hover {
  background-color: #858585; /* Darker green on hover */
}

.sidebar {
  background-color: #f8f9fa; /* Light gray sidebar background */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%; /* Set fixed sidebar width */
  display: flex; /* Allow stacking elements vertically */
  flex-direction: column; /* Stack elements vertically within the sidebar */
}

.sidebar.hidden {
  transform: translateX(-140%);
}

.add-item {
  padding-top: 5%;
  display: flex;
  flex-direction: column; 
  align-items: center; /* Align elements vertically within the add-item section */
  margin-bottom: 20px;
  justify-content: space-between; /* Distribute elements horizontally within the add-item section */
}

.add-item input {
  flex: 1; /* Allow input to grow and fill available space */
  padding: 10px; /* Add padding for better input appearance */
  border: 1px solid #000000; /* Add a light border */
  border-radius: 3px
}


.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.list li {
  display: flex;
  justify-content: space-between; /* Aligne les éléments horizontalement, en les espaçant au maximum */
  align-items: center; /* Centre les éléments verticalement */
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}

.item-name {
  color: #000;
  text-align: right; /* Aligne le texte à droite */
  flex-grow: 1; /* Permet au texte de s'étendre sur toute la largeur disponible */
}

.item-name {
  flex-grow: 1; /* Permet au texte de s'étendre sur toute la largeur disponible */
  margin-right: 10px;
}

.delete-button {
  background-color: #dc3545; /* Rouge pour une action de suppression */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style>