import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import DoctorView from '../views/DoctorView.vue'
import SecretaryView from '../views/SecretaryView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/doctorLogin/:user',
    name: 'doctorLogin',
    component: DoctorView
  },
  {
    path: '/secretaryLogin',
    name: 'secretaryLogin',
    component: SecretaryView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
