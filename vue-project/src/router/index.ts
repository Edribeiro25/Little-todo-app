import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LogginView from '../views/LoginPage.vue'
import store from '../store'
import axios from 'axios'
import VueCookies  from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(""),
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

async function checkJwt()
{
  await axios.get('http://localhost:3000/api/me', 
    {headers: {
    Authorization: `Bearer ${VueCookies.get('access_token')}`}})
  .then(res => {
    if(res.status == 201) {
        store.commit('setUserId',res.data.id)
        store.commit('setLastname', res.data.lastname)
        store.commit('setFirstname', res.data.firstname)
  
    }
    else
    {
        store.commit('setUserId',0)
        store.commit('setLastname', '')
        store.commit('setFirstname', '')
  
    }})
    .catch(err => {console.log(err) ; return false})
  if(store.state.user.id != 0)
    return true
  else
    return false
}

router.beforeEach(() => {
  checkJwt().then(before => {
    console.log("BEFOREEEEEE",before)
    if (before == false){
    router.push("/")
    }
    else{
      router.push({name: 'home'})
    }
    })
})

export default router
