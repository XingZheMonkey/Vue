import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateResource from "../views/CreateResource.vue"
import DetailPage from "../views/DetailView.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/add',
    name:'Add',
    component:CreateResource
  },
  {
    path:"/detail/:id",
    name:"Detail",
    component:DetailPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
