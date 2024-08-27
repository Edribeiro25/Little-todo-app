<template>
    <li>
      <div v-if="!editing">
        {{ task.name }} ({{ task.dueDate }}) - {{ task.status }}
        <button @click="startEditing">Modifier</button>
      </div>
      <form v-else @submit.prevent="saveTask">
        <label for="name">Name:</label>
        <input type="text" v-model="task.name" placeholder="Nom de la tâche">
        <label for="date">Date limite:</label>
        <input type="date" v-model="task.dueDate">
        <label for="description">Description:</label>
        <input type="text" v-model="task.description">
        <button type="submit">Enregistrer</button>
        <button @click="cancelEditing">Annuler</button>
      </form>
    </li>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const task = ref({name: "Test",dueDate: "Test",description :"" ,status: false,required: true,});
  
  const editing = ref(false);
  
  const startEditing = () => {
    editing.value = true;
  };
  
  const saveTask = () => {
    // Ici, vous pouvez envoyer les données de la tâche modifiée à votre backend
    console.log('Tâche enregistrée :', task.value);
    editing.value = false;
  };
  
  const cancelEditing = () => {
    editing.value = false;
  };
  </script>
  <style scoped>
  </style>