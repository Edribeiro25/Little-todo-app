import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LogginView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
