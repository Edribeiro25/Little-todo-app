<template>
    <header class="header">
      <h1> {{ title }}</h1>
      <input
        class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      >
    </header>
    <input type="date" v-model="task.dueDate">
    <div>
      <div v-for="(nom, index) in task" :key="index" class="nom-item" @click="toggleCheckbox(index)">
            <input type="checkbox" :id="nom" v-model="checkedNames[index]" />
            <label :for="nom">{{ nom.task }}</label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const title = ref("List of task");
  const task = ref([
  { task: "Alice", status: true },
  { task: "Bob", status: false },
]);
  const checkedNames = ref(Array(task.value.length).fill(false));
  
  const toggleCheckbox = (index) => {
    checkedNames.value[index] = !checkedNames.value[index];
  };

  function addTask(){
    console.log('add task');
  }

  function taskDone(){
    console.log('add task');
  }


  </script>
  
  <style scoped>

  #notDone {
    background-color: #f0f0f0;
  }
  #Done {
    background-color: #f0f0f0;
  }
  .nom-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
  }
  
  .nom-item input[type="checkbox"] {
    margin-right: 10px;
  }
  
  .nom-item:hover {
    background-color: #f0f0f0;
  }
  </style>
  