import Vue from 'vue'
import App from "./App"

import {
  VueRouter
} from "./vue-router.js"

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [{
  path: "/",
  component: () => import("./components/hello")
}, {
  path: "/about",
  component: () => import("./components/about")
}]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')