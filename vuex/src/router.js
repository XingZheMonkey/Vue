import Vue from 'vue'
import Router from 'vue-router'
import productOne from './views/productOne.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'product-one',
      component: productOne
    }
  ]
})
