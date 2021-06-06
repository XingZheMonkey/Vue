import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name:"index",
      component:index
    },
    {
      path:'/login',
      name:"login",
      component:login
    },
    {
      path:"/register",
      name:"register",
      component:()=>import("./views/register.vue")
    }
  ]
})
