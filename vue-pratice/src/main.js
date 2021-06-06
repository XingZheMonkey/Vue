import Vue from 'vue'
import App from './App.vue'
import "./icons/index"
import store from './store'
import "@components/Message/message.js"
import "@components/Modal/modal.js"
import router from './router'
import i18n from "./i18n/index.js"


Vue.config.productionTip = false;


new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')