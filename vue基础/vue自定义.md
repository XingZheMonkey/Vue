## 自定义指令

- 全局指令(写在mian.js里)


	```
	<!-- 无参指令调用 -->
	<li v-theme></li>

	<!-- 有参指令调用 -->
	
	<!-- ****自定义指令的参数，定义时是字符串，传过来也必须是字符串格式 -->
	<li v-theme="'wide'"></li>

	<!-- arg调用 -->
	<li v-theme:column="narrow"></li>


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

	Vue.directive('rainbow',{
		bind(el,binding,vnode){
	 		// 随机色
	 		el.style.color="#"+Math.random().toString(16).slice(2,8);
		}
	})

	```


- 局部指令

	```
	export default{
		directives:{
			// 自定义局部指令
			'rainbow':{
				bind(el,binding,vnode){
					el.style.color="#"+Math.random().toString(16).slice(2,8)
				}
			}
		}
	}

	```

# 注意:自定义局部指令是复数filters,自定义局部过滤器是复数directives

## 自定义过滤器

- 全局过滤器

	```
	<!-- 调用：数据 | 过滤器  -->
	<!-- 管道符'|'，过滤作用 -->
	{{blog.body | snippet}}

	// 自定义全局过滤器

	Vue.filter("snippet",function(value){
		// 内容中只显示100个字符，其余用省略号代替
		return value.slice(0,100)+"...";
	})

	Vue.filter("to-uppercase",function(value){
		// 将to-uppercase过滤器中的内容转化为大写
		return value.toUpperCase();
	})
	```

- 局部过滤器

	```
	export default{
		filters:{
			// 自定义局部过滤器
				
			// "to-uppercase":function(value){
				// 	return value.toUpperCase();
			// }
				
			// ES6写法
			toUppercase(value){
				// 将to-uppercase过滤器中的内容转化为大写
				return value.toUpperCase();
			}
		}
	}
	```