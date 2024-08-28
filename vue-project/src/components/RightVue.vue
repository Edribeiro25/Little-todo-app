
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';

defineExpose({ fetchTask });

const visible = ref(false);
async function fetchTask(taskId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`,
      },
    });
    visible.value = true;
    task.value = response.data;
    console.log('Task fetched:', response.data);
  } catch (error) {
    console.error('Error fetching task:', error);
  }
  console.log('Task ID:', task.value);
}

const task = ref({
  title: '',
  dateLimit: '',
  description: '',
  done : false,
  createdAt: '',
  updatedAt: '',
});

const editing = ref(false);

const startEditing = () => {
  editing.value = true;
};

const saveTask = async () => {
  console.log('Tâche enregistrée :', task.value);
  editing.value = false;
};

const cancelEditing = () => {
  editing.value = false;
};
</script>

<template>
  <div class="right" v-if="visible">
  <li>
    <div v-if="!editing">
      {{ task.title }} ({{ task.dateLimit }})
      <button @click="startEditing">Modifier</button>
    </div>
    <form v-else @submit.prevent="saveTask">
      <label for="name">Nom:</label>
      <input type="text" v-model="task.title" placeholder="Nom de la tâche">
      <label for="date">Date limite:</label>
      <input type="date" v-model="task.dueDate">
      <label for="description">Description:</label>
      <input type="text" v-model="task.description">
      <button type="submit">Enregistrer</button>
      <button @click="cancelEditing">Annuler</button>
    </form>
  </li>
  </div>
</template>

  <style scoped>
  </style>