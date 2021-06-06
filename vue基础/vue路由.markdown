#路由

- 安装: npm install vue-router --save-dev

- 引入: import VueRouter from 'vue-router'

- 引用: Vue.use(VueRoter)

- 配置

```
// 配置路由
const router=new VueRouter({
	routes:[  // ***重点在这里是routes而不是routers，否则<router-view>标签是真的不会显示的
		
		{path:"/",component:Home},
		{path:"/helloworld",component:HelloWorld}

	],
	// history可以去掉http协议的/#
	mode:"history"
})

```

- 实例化使用 

```
new Vue({
  // 实例化内使用router
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})

```

- 路由操作
	- 路由显示

		```
			<!-- 使用router-view标签显示路由根目录 -->

			<router-view></router-view>
		```
		```	
			// 使用router-link代替a标签进行跳转

            <router-link tag="div" to="/">首页</router-link>

            // tag可以设置router-link产生的标签,默认是a
         
		```

    - 绑定路由路径



		```
		<!-- 1.动态绑定路径，通过data数据 -->
		 <router-link :to="HomeLink">首页</router-link>


		 <script>
			export default {
			  name: 'Header',
			  data () {
			    return {
			      HomeLink:"/"
			    }
			  }
			}
		</script>
		```

		```
		<!-- 2.动态绑定路径，通过定义路由名称 -->
		    <router-link :to="{name:'menuLink'}">菜单</router-link>

				
			// {path:'/menu',name:"menuLink",component:Menu}

		```

		```
		<!-- 3.静态绑定路径 -->
		<router-link to="/">管理</router-link>
		```

	- 路由跳转的三种方式

		```
		// 1.跳转到上一次浏览的页面
  	    // this.$router.go(-1)
  	    
  	    // 2.跳转到指定地址
  	    // this.$router.replace('/menu')
  	    
  	    // 3.跳转到指定路由的名称下
  	    // this.$router.replace({name:'menuLink'})
  	    
  	    // 4.通过push进行跳转
  	    // this.$router.push('/menu')
  	    // this.$router.push({name:"menuLink"})

		```

	- 二级路由

		```
		// 使用children标记层级，三级路由同理

		// redirect:'/contact' 设置默认显示路由路径

		{path:'/About',component:About,redirect:'/contact',children:[
			{path:'/contact',name:"contactLink",component:Contact},
			{path:'/delivery',name:"deliveryLink",component:Delivery},
			{path:'/news',name:"newsLink",component:News},
			{path:'/history',name:"historyLink",component:History}
		]}

		```

	- 导航守卫

		- 全局守卫

		```
		// 1.导航守卫 - 全局守卫
		router.beforeEach((to,from,next)=>{

			// to 代表即将跳转的组件，from 代表从哪个组件离开
			console.log(to);

			if (to.path=='/Login' || to.path=='/Register') {
				next();
			}else{
				alert('请先登录');
				next('/Login');
			}
		})
		```

		- 路由独享

		```
		{path:'/Admin',component:Admin,beforeEnter:(to,from)=>{

			// 1.导航守卫 - 路由独享
			alert('请先登录')
			next('/Login');
		}}

		```

		- 组件内守卫

		```
		
		export default{
			data(){
				return {
					name:"Monkey"
				}
			},
			// 组件内守卫，进入

			// 注意***：beforeRouteEnter 中 route , 并不是router
		
			beforeRouteEnter:(to,from,next)=>{

			// *** vm 可以完成异步请求数据，否则data内数据会未加载
				next(vm =>{
					alert("hello "+vm.name)
			 	})
			},
			
			// 组件内守卫，离开

			// 注意：beforeRouteLeave 中 route , 并不是router
			beforeRouteLeave:(to,from,next)=>{
				if (confirm("确定离开吗？") == true) {
					next();
				}else{
					next(false);
				}
			}
		
		}

		```

	- 路由复用

		```
		// App.vue 添加内容

		<div class="container">
	      <div class="row">
	        <div class="col-sm-12 col-md-4">
	          <router-view name="delivery"></router-view>
	        </div>
	        <div class="col-sm-12 col-md-4">
	          <router-view name="news"></router-view>
	        </div>
	        <div class="col-sm-12 col-md-4">
	          <router-view name="history"></router-view>
	        </div>
	      </div>
	  	</div>

		// main.js 配置路由

	  	{path:'/',components:{
		
		// 复用router-view,记得改为components
		
			default:Home,
			'delivery':Delivery,
			'history':History,
			'news':News
			}
		}
		
		```

	- 路由滚动

		```
		const router=new VueRouter({
			routes,
			mode:"history",
			<!-- 滚动行为控制 -->
			scrollBehavior(to,from,savedPosition){
				// 定位到位置 return {x:0,y:100}

				// 定位到标签 return {selector:'.btn'}

				<!-- 记录位置，与浏览器回退操作有关 -->
				if (savedPosition) {
					return savedPosition
				}else{
					return {x:0,y:0}
				}
			}
		})
		```