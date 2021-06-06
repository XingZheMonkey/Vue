import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import add from './views/addGame.vue'
import edit from './views/edit.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:"/add",
      name:'add',
      component:add
    },
    {
      path:"/edit/:id",
      component:edit
    }
  ]
})