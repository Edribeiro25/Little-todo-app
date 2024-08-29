<template>
  <div class="center" v-if="visible">
   
  <header class="header">
    <h1>{{title}}</h1>
    <button @click="showForm = !showForm">Ajouter une tâche</button>
  </header>
  <form v-if="showForm" @submit.prevent="addTask">
    <label for="nom">Nom de la tâche :</label>
    <input type="text" id="nom" v-model="newTask.name" required>
    <label for="date">Date d'échéance :</label>
    <input type="date" id="date" v-model="newTask.dueDate" required>
    <label for="description">Description (optionnelle) :</label>
    <textarea id="description" v-model="newTask.description"></textarea>
    <button type="submit">Ajouter</button>
  </form>
  <h2>Tâches en cours</h2>
  <ul>
    <li v-for="(task, index) in tasks.filter(task => !task.done)"
        :key="index"
        class="task-item">
    <input class="validate" type="checkbox" @click="taskDone(task)">
    <span @click="handleTaskClick(task)">{{ task.title }}</span>
    </li>
  </ul>
  <button @click="showPendingTasks = !showPendingTasks">Tâches terminées</button>
  <ul v-if="showPendingTasks">
    <li
      v-for="(task, index) in tasks.filter(task => task.done)"
      :key="index"
      class="task-item">
    <input class="validate" type="checkbox" @click="taskDone(task)">
    <span @click="handleTaskClick(task)">{{ task.title }}</span>
    </li>
  </ul>
</div>
<div @class="vide" v-if="!visible">
  <h1>Aucune liste de taches selectionner </h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { defineExpose, defineEmits } from 'vue';

defineExpose({fetchList,DeleteOrder,hide})
const emit = defineEmits(['rightID']);
const title = ref('');
const visible = ref(false);
const tasks = ref([]);
const newTask = ref({
  name: '',
  dueDate: '',
  description: '',
  done: false,
  detail: '',
});
const showForm = ref(false);
const showPendingTasks = ref(false);
const listId = ref(0);

function hide(){
  visible.value = false;
}

async function DeleteOrder(id) {
  await axios.delete(`http://localhost:3000/api/task/${id}`,
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => {tasks.value = tasks.value.filter(tasks => tasks.id !== id);})
    .catch(err => {console.log(err)})
  }

async function fetchList(id){
  if(id != 0){
    visible.value = true;
  }
  listId.value = id;
  await axios.get(`http://localhost:3000/api/list1/${id}`,
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => {title.value = res.data.title; tasks.value = res.data.task;})
    .catch(err => {console.log(err)})
}

function addTask(){
  axios.post(`http://localhost:3000/api/createTask`,
      { body:{
        title : newTask.value.name,
        done : false,
        description : newTask.value.description,
        dateLimit : newTask.value.dueDate,
        listId : listId.value,
    }},
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => {tasks.value.push(res.data);})
    .catch(err => {console.log(err)})
    showForm.value = false;
}

function taskDone(task){
  axios.patch(`http://localhost:3000/api/task`,
      { body:{
        id : Number(task.id),
        title : task.title,
        done : !task.done,
        desciption : task.description,
        dateLimit : task.dateLimit,
    }},
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => {task.done = !task.done;})
    .catch(err => {console.log(err)})
}
function handleTaskClick(task){
  emit('rightID', task.id);
}

</script>

<style scoped>

h1 {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h2 {
  text-align: center;
}

.validate {
  cursor: pointer;
  margin-left: 0.5rem;
  margin-top: 0;
  margin-right: 1.5rem;
  margin-bottom: 0;
}

.header {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

.task-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer; 
}

.hidden {
  display: none;
}
</style>