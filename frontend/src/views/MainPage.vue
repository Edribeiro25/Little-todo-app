<template>
    <nav class="navbar">
      <div class="navbar-brand">
        Bienvenue
      </div>
      <div class="navbar-end">
        <button @click="logout">Déconnexion</button>
      </div>
    </nav>
    <div class="main-page">
      <div class="left">
        <Left @centerID="centerPage" @deleteListOrder="checkcenter"/>
      </div>
      <div class="center">
        <CenterPage ref="center" @rightID="rightPage"/>
      </div>
      <div class="right">
        <Right ref="right" @deleteTask="centerorder"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import Left from '../components/LeftVue.vue';
  import CenterPage from '../components/CenterVue.vue';
  import Right from '../components/RightVue.vue';
  import VueCookies from 'vue-cookies';
  import router from '../router';
  import store from '../store';
  import { ref } from 'vue';

  const center = ref();
  const right = ref();
  const idCenter = ref(0);

  function checkcenter(id){
    if(idCenter.value == id){
      center.value.hide();
      right.value.hide()
      idCenter.value = 0;
    }
  }
  
  function centerPage(idlist){
    idCenter.value = idlist;
    center.value.fetchList(idlist);
  }

  function centerorder(id){
    center.value.DeleteOrder(id);
  }

  function rightPage(idtask){
    right.value.fetchTask(idtask);
  }

  const logout = () => {
    store.commit('setUserId',0);
    VueCookies.remove('access_token');
    router.push('/');
  };
  </script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 1rem;
}
.main-page {
    display: grid;
    grid-template-columns: 20% 50% 30%;
}

.left, .center, .right {
  flex: 1;
  padding: 10px;
  height: 100vh; 
}

.left {
  flex: 0.20;
  background-color: #f0f0f0;
}

.center {
  flex: 0.5;
  background-color: #ffffff;
}

.right {
  flex: 0.30;
  background-color: #f0f0f0;
}
</style>