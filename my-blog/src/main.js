import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import 'carbon-components/css/carbon-components.css';
import CarbonComponentsVue from '@carbon/vue/src/index';

Vue.use(CarbonComponentsVue);

// 自定义全局过滤器

Vue.filter("snippet",function(value){
	// 内容中只显示100个字符，其余用省略号代替
	return value.slice(0,100)+"...";
})

// Vue.filter("to-uppercase",function(value){
// 	// 将to-uppercase过滤器中的内容转化为大写
// 	return value.toUpperCase();
// })




// 自定义全局指令

Vue.directive('theme',{
	// 钩子函数bind
	bind(el,binding,vnode){
		// binding代表参数,el代表元素
		if (binding.value=='wide') {
			// 参数为wide时的样式
			el.style.maxWidth="800px";
		}else if(binding.value=='narrow'){
			// 参数为narrow时的样式
			el.style.maxWidth="560px";
		}

		// :后面的参数
		if (binding.arg=='column') {
			// 如果存在v-themem:column，执行下列语句
			el.style.background="#6677cc";
			el.style.padding='20px';
		}
	}
})

// Vue.directive('rainbow',{
// 	bind(el,binding,vnode){
// 		// 随机色
// 		el.style.color="#"+Math.random().toString(16).slice(2,8);
// 	}
// })




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
