// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// npm install vue-router --save-dev
import VueRouter from 'vue-router'
// npm install vue-resource --save-dev
import VueResource from 'vue-resource'
import App from './App'
import HelloWorld from './components/HelloWorld'
import Home from './components/Home'




Vue.config.productionTip = false

// 引用路由
Vue.use(VueRouter)  
// 引用http
Vue.use(VueResource)

// 配置路由
const router=new VueRouter({
	routes:[  // ***重点在这里是routes而不是routers，否则<router-view>标签是真的不会显示的***
		
		{path:"/",component:Home},
		{path:"/helloworld",component:HelloWorld}

	],
	// history可以去掉http协议的/#
	mode:"history"
})

// 全局注册组件
// 1.import Users from './components/Users'
// 2.Vue.component("users",Users);



new Vue({
  // 实例化内使用router
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
