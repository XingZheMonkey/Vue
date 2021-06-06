import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'



// 二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import News from './components/about/News'


// 利用 export 公开，使main.js能够访问
export const routes=[
	{path:'/',components:{
		
		// 复用router-view,记得改为components
		
			default:Home,
			'delivery':Delivery,
			'history':History,
			'news':News
		}
	},
		{path:'/menu',name:"menuLink",component:Menu},
		{path:'/Login',component:Login},
		{path:'/Register',component:Register},
		{path:'/Admin',component:Admin
			// ,beforeEnter:(to,from)=>{

			// 	// 1.导航守卫 - 路由独享
			// 	alert('请先登录')
			// 	next('/Login');
			// }
		},
		{path:'/About',component:About,redirect:'/contact',children:[

			// 二级路由用children标记，redirect设置默认显示
			{path:'/contact',name:"contactLink",component:Contact},
			{path:'/delivery',name:"deliveryLink",component:Delivery},
			{path:'/news',name:"newsLink",component:News},
			{path:'/history',name:"historyLink",component:History}
		]},

		// 路径不存在时,用*匹配，自动重定位至根路径
		{path:'*',redirect:'/'}
]