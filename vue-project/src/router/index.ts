import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LogginView from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory("http://localhost:8080"),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogginView
    },
    {
      path: '/home',
      name: 'home',
      component: MainPage
    }
  ]
})

export default router
