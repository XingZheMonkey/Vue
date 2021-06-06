import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import about from './views/about.vue'
import aboutOne from './views/aboutOne.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      meta: {
        requireAuth: false
      },
      children: [{
        path: '/about/one',
        name:'one',
        component:aboutOne
      }]
    }
  ]
})