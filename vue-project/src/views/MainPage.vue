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
        <Left />
      </div>
      <div class="center">
        <CenterPage  />
      </div>
      <div class="right">
        <Right />
      </div>
    </div>
  </template>
  
  <script setup>
  import Left from '@/components/LeftVue.vue';
  import CenterPage from '@/components/CenterVue.vue';
  import Right from '@/components/RightVue.vue';
  import VueCookies from 'vue-cookies';
  import router from '../router';
  import store from '../store';

  const center = ref();
  
  function centerPage(id){
    center.value.fetchList(id);
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
    display: flex;
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