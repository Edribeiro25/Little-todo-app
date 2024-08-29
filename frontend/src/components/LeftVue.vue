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
      <ModalVue ref="modal" @yes="deleteList"/>
    </div>
  </template>
  
  <script setup>
  import {onMounted, ref } from 'vue';
  import axios from 'axios';
  import VueCookies from 'vue-cookies';
  import { defineEmits } from 'vue';
  import ModalVue from './ModalVue.vue';

  const emit = defineEmits(['centerID'], ['deleteListOrder']);
  const iddel = ref();
  const id = ref();
  const items = ref([]);
  const sidebarVisible = ref(true);
  const newItem = ref('');
  const modal = ref();

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
  iddel.value = item.id;
  modal.value.afficher(item.title);
};

async function deleteList() {
  const url = `http://localhost:3000/api/deletelist/${iddel.value}`;
    await axios.delete(url,
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => {items.value = items.value.filter(item => item.id !== iddel.value);})
    .catch(err => {console.log(err)})
    emit('deleteListOrder', iddel.value);
  }
  
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
.navbar {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between; 
  color: white; 
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
  background-color: #858585;
}

.sidebar {
  background-color: #f8f9fa;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%;
  display: flex; 
  flex-direction: column; 
}

.sidebar.hidden {
  transform: translateX(-140%);
}

.add-item {
  padding-top: 5%;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  margin-bottom: 20px;
  justify-content: space-between; 
}

.add-item input {
  flex: 1; 
  padding: 10px;
  border: 1px solid #000000; 
  border-radius: 3px
}

li {
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center; 
  padding: 1rem 1rem;
  border: none;
}

.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
  color: #000;
  text-align: right;
}

.delete-button {
  background-color: #dc3545; 
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin: 0;
}

ul {
  border: none;
  padding: 1rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>