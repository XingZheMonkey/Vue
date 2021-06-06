import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home'
import Layout from "@views/Layout/index"
import Data1 from "@views/dataManage/data1"
import Data2 from "@views/dataManage/data2"
import Data3 from "@views/dataManage/data3"
import Data4 from "@views/dataManage/data4"

Vue.use(VueRouter)

export const routes = [{
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: "/home",
    inMenu: true, // 是否要渲染到左侧菜单栏
    meta: {
      title: "leftNav.home"
    },
    children: [{
      path: '/home',
      name: 'home',
      component: Home
    }]
  },
  {
    path: "/login",
    name: "login",
    inMenu: false,
    component: () => import("@views/Login/Login")
  },
  {
    path: "/register",
    name: "register",
    inMenu: false,
    component: () => import("@views/Login/Register")
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    inMenu: false,
    component: () => import("@views/Login/Reset")
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    inMenu: false,
    component: () => import("@views/Login/Forget")
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    redirect: "/dataManage/data1",
    meta: {
      title: "leftNav.performance"
    },
    inMenu: true,
    component: Layout,
    children: [{
        path: '/dataManage/data1',
        name: 'data1',
        component: Data1,
        inMenu: true,
        meta: {
          title: "leftNav.optimizing",
          keepAlive: true
        }
      },
      {
        path: '/dataManage/data2',
        name: 'data2',
        component: Data2,
        inMenu: true,
        meta: {
          title: 'leftNav.cache'
        }
      },
      {
        path: '/dataManage/data3',
        name: 'data3',
        component: Data3,
        inMenu: true,
        meta: {
          title: 'leftNav.webpack'
        }
      },
      {
        path: '/dataManage/data4',
        name: 'data4',
        component: Data4,
        inMenu: true,
        meta: {
          title: 'leftNav.new'
        }
      }
    ]
  }
]


export const asyncRoutes = [{
    path: "/userManage",
    name: "userManage",
    component: Layout,
    redirect: "/userAction",
    inMenu: true,
    meta: {
      title: "leftNav.useManage",
      roles: ['Admin']
    },
    children: [{
      path: "/userAction",
      name: "userAction",
      component: () => import("@views/userManage/UserAction")
    }]
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("@views/NotFound")
  },
]

export const createRouter = (routes) => new VueRouter({
  routes,
  mode:'history'
})

const router = createRouter(routes)

// export function resetRouter(){
//   const newRouter = createRouter(routes)
//   router.matcher = newRouter.matcher
// }

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;

  if (to.path == "/home" || to.path == "/register" || to.path == "/resetPassword" || to.path == "/forgetPassword") {
    next()
  } else if (to.path == "/login") {
    isLogin ? next("/") : next()
  } else {
    isLogin ? next() : next("/login")
  }
})


export default router