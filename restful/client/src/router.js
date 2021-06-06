import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import register from './views/register.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'index'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect:"/home",
      children:[
        {
          path:"/home",
          name:"home",
          component:()=>import("./views/home.vue")
        },
        {
          path:"/setting",
          name:"setting",
          component:()=>import("./views/setting.vue")
        },
        {
          path:"/person",
          name:"person",
          component:()=>import("./views/person.vue")
        },
        {
          path:"/place",
          name:"person",
          component:()=>import("./views/place.vue")
        },
        {
          path:"/info",
          name:"info",
          component:()=>import("./views/info.vue")
        },
        {
          path:"/monkey",
          name:"monkey",
          component:()=>import("./views/monkey.vue")
        }
      ]
    },
    {
      path:'/register',
      name:"register",
      component:register
    },
    {
      path:"*",
      name:"NotFound",
      component:NotFound
    },
    {
      path:"/login",
      name:"login",
      component:()=>import("./views/login.vue")
    }
  ]
  
})

// 路由守卫

router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.eleToken?true:false;
  if(to.path=="/login" || to.path=="/register"){
    next();
  }else{
    isLogin ? next(): next("/login");
  }
})

export default router;
