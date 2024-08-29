import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LogginView from '../views/LoginPage.vue'
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
  let resultat = false;
  await axios.get('http://localhost:3000/api/me', 
    {headers: {
    Authorization: `Bearer ${VueCookies.get('access_token')}`}})
  .then(res => {
    if(res.status == 201) {
        resultat = true;
  
    }
    else
    {
      resultat = false;
    }})
    .catch(err => {console.log(err);})
    return resultat;
}

router.beforeEach(() => {
  checkJwt().then(before => {
    if (before == false){
    router.push("/")
    }
    else{
      router.push({name: 'home'})
    }
    })
})

export default router
