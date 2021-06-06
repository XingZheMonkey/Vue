// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import {routes} from './routes'


Vue.config.productionTip = false
Vue.use(VueRouter)



// 配置路由
const router=new VueRouter({
	routes,
	mode:"history",
	scrollBehavior(to,from,savedPosition){
		// return {x:0,y:100}
		// return {selector:'.btn'}
		if (savedPosition) {
			return savedPosition
		}else{
			return {x:0,y:0}
		}
	}
})

// // 2.导航守卫 - 全局守卫
// router.beforeEach((to,from,next)=>{

// 	// to 代表即将跳转的组件，from 代表从哪个组件离开
// 	console.log(to);

// 	if (to.path=='/Login' || to.path=='/Register') {
// 		next();
// 	}else{
// 		alert('请先登录');
// 		next('/Login');
// 	}
// })


// 实例化
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
