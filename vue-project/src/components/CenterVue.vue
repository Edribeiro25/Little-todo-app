<template>
  <header class="header">
    <h1>Ma To-Do List</h1>
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
    <input type="checkbox" v-model="task.done">
    <span @click="handleTaskClick(task)">{{ task.name }}</span>
    </li>
  </ul>
  <button @click="showPendingTasks = !showPendingTasks">Tâches terminées</button>
  <ul v-if="showPendingTasks">
    <li
      v-for="(task, index) in tasks.filter(task => task.done)"
      :key="index"
      class="task-item">
    <input type="checkbox" v-model="task.done">
    <span @click="handleTaskClick(task)">{{ task.name }}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = router.user;
const tasks = ref([]);
const newTask = ref({
  name: '',
  dueDate: '',
  description: '',
  done: false,
  // Optionally add a detail property for storing additional information
  detail: '',
});
const showForm = ref(false);
const showPendingTasks = ref(false);

const addTask = () => {
  console.log('store ', user);
  tasks.value.push({ ...newTask.value });
  newTask.value = { name: '', dueDate: '', description: '', done: false, detail: '' }; // Reset with optional detail
  showForm.value = false;
};

const handleTaskClick = (task) => {
  // Log some details about the clicked task to the console
  console.log(`Task clicked:`);
  console.log(`Name: ${task.name}`);
  console.log(`Done: ${task.done}`);
  console.log(`Due Date: ${task.dueDate}`);
  console.log(`Description: ${task.description}`);

  // Optionally: You could display additional details in a modal or alert box
  // based on the task's `detail` property (if you added it)
};
</script>

<style scoped>
/* Styles généraux */
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
  cursor: pointer; /* Make the task items clickable */
}

/* Styles spécifiques */
.hidden {
  display: none;
}
</style>