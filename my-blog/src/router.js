import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import addBlog from './views/addBlog.vue'
import singleBlog from './views/singleBlog.vue'
Vue.use(Router)

Vue.use(Resource)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'addBlog',
      component: addBlog
    },
    {
      path: '/show',
      name: 'show',
      component: () => import('./views/show.vue')
    },
    {
      path:'/blog/:id',
      component:singleBlog
    }
  ]
})
