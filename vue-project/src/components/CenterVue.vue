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
    <input type="date" id="date" v-model="newTask.dueDate">
    <label for="description">Description (optionnelle) :</label>
    <textarea id="description" v-model="newTask.description"></textarea>
    <button type="submit">Ajouter</button>
  </form>
  <h2>Tâches en cours</h2>
  <ul>
    <li v-for="(task, index) in tasks.filter(task => !task.done)"
        :key="index"
        class="task-item">
    <input type="checkbox" @click="taskDone(task)">
    <span @click="handleTaskClick(task)">{{ task.title }}</span>
    </li>
  </ul>
  <button @click="showPendingTasks = !showPendingTasks">Tâches terminées</button>
  <ul v-if="showPendingTasks">
    <li
      v-for="(task, index) in tasks.filter(task => task.done)"
      :key="index"
      class="task-item">
    <input type="checkbox" @click="taskDone(task)">
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
import { useRouter } from 'vue-router';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { defineExpose, defineEmits } from 'vue';

defineExpose({fetchList})
const emit = defineEmits(['rightID']);

const listId = ref(0);
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
    .then(res => { console.log(res.data); title.value = res.data.title; tasks.value = res.data.task;})
    .catch(err => {console.log(err)})
    console.log(tasks.value);
}

function addTask(){
  console.log('Add task',newTask);
  axios.post(`http://localhost:3000/api/createTask`,
      { body:{
        title : newTask.value.name,
        done : false,
        desciption : newTask.value.description,
        dateLimit : newTask.value.dueDate,
        listId : listId.value,
    }},
    {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`
      }})
    .then(res => {tasks.value.push(res.data);})
    .catch(err => {console.log(err)})
    console.log(tasks.value);
}

function taskDone(task){
  console.log('Task done',task);
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
    console.log(tasks.value);
}
function handleTaskClick(task){
  console.log('Task clicked:', task);
  emit('rightID', task.id);
}

const title = ref('');
const visible = ref(false);
const router = useRouter();
const user = router.user;
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


</script>

<style scoped>
.header {
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
  cursor: pointer; 
}

.hidden {
  display: none;
}
</style>