
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { defineExpose } from 'vue';
import ModalVue from './ModalVue.vue';

defineExpose({ fetchTask , hide});
const emit = defineEmits(['deleteTask']);

const visible = ref(false);

const task = ref({
  title: '',
  dateLimit: '',
  description: '',
  done : false,
  createdAt: '',
  updatedAt: '',
});

const modal = ref();

async function fetchTask(taskId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${VueCookies.get('access_token')}`,
      },
    });
    visible.value = true;
    task.value = response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
  }
  task.value.dateLimit = new Date(task.value.dateLimit).toLocaleDateString();
  task.value.createdAt = new Date(task.value.createdAt).toLocaleDateString();
}

function deleteTask() {
  modal.value.afficher(task.value.title);
}

function deleteTaskOrder() {
  emit('deleteTask', task.value.id);
  visible.value = false;
}

function hide() {
  visible.value = false;
}

</script>

<template>
  <div class="right" v-if="visible">
  <div>
    <h2>{{ task.title }}</h2>
    <p>Date de création : {{ task.createdAt }}</p>
    <p>Date limite : {{ task.dateLimit }}</p>
    <p>Description : {{ task.description }}</p>
    <button @click="deleteTask"> Supprimer </button>
    <ModalVue ref="modal" @yes="deleteTaskOrder"/>
</div>
  </div>
</template>

  <style scoped>
  </style>