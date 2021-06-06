import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index.vue'
import Recognize from './views/Recognize.vue'
import Examination from './views/Examination.vue'
import User from './views/User.vue'
import Level from './views/Level.vue'
import Search from './views/Search.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Setting from "./views/Setting.vue"
import UpdateAvatar from "./views/UpdateAvatar.vue"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/recognize',
      name: 'recognize',
      component: Recognize
    },
    {
      path: '/examination',
      name: 'examination',
      component: Examination
    },
    {
      path: "/user",
      name: "user",
      component: User
    },
    {
      path: "/level",
      name: "level",
      component: Level
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }, 
    {
      path: "/setting",
      name: "setting",
      component: Setting
    },
    {
      path: "/avatar",
      name: "avatar",
      component: UpdateAvatar
    },
    {
      path: "/question/:situation",
      name: "question",
      component: ()=>import("./views/Question.vue")
    },
    {
      path: "/errorQuestion",
      name: "errorQuestion",
      component: ()=>import("./views/ErrorQuestion.vue")
    },
    {
      path: "/rank",
      name: "rank",
      component: ()=>import("./views/Rank.vue")
    },
    {
      path:"/news/:id",
      name:"news",
      component: ()=>import("./views/News.vue")
    },
    {
      path:"/recommand/:id",
      name:"recommand",
      component: ()=>import("./views/Recommand.vue")
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {

  const isLogin = localStorage.eleToken ? true : false

  if (to.path == "/login" || to.path == "/register" || to.path == "/" || to.path == "/user" || to.path == "/recognize" || to.path == "/search" || to.path == "/examination" || to.path == "/level") {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router;