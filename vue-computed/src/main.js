import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


function create(Component,props) {  
  const vm = new Vue({
    render(h){
      return h(Component,{props})
    }
  }).$mount()

  document.body.appendChild(vm.$el)

  const comp = vm.$children[0]

  comp.remove = function () {  
    document.body.removeChild(vm.$el)
    vm.$destroy;
  }

  return comp
}


Vue.prototype.$create = create

new Vue({
  render: h => h(App),
}).$mount('#app')
