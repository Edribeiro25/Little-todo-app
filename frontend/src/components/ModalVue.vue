<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h2>Êtes-vous sûr de vouloir supprimer ?</h2>
      <p>{{ nomASupprimer }}</p>
      <div class="button-container">
        <button @click="noDelete">Non</button>
        <button class="btn-danger" @click="yesDelete">Oui</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , defineExpose} from 'vue';

const emit = defineEmits(['yes']);
defineExpose({afficher});

const show = ref(false);
const nomASupprimer = ref('');

function afficher(name){
  nomASupprimer.value = name;
  show.value = true;
};

function noDelete() {
  show.value = false;
};

function yesDelete(){
  show.value = false;
  emit('yes');
};
</script>

<style scoped>
.modal {
  text-align: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

h2 {
  text-align: center;
}
.button-container {
  text-align: right;
}

.btn-danger {
  background-color: red;
  color: white;
}

</style>