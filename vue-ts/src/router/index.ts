import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import jwt_decode from "jwt-decode"

Vue.use(VueRouter)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'layout',
    hidden: true,
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页", icon: 'el-icon-s-home' },
        component: () => import("@/views/Home.vue")
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    hidden: false,
    redirect: "/userInfo",
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        meta: { title: "个人中心" },
        component: () => import("@/views/UserManage/UserInfo.vue")
      }
    ]
  },
  {
    path: "/dataManage",
    meta: { title: "数据管理", icon: "el-icon-coin" },
    hidden: true,
    component: Layout,
    redirect: "/table",
    children: [
      {
        path: "/table",
        name: "table",
        meta: { title: "表格管理", icon: "el-icon-s-data" },
        component: () => import("@/views/DataManage/TableData.vue")
      },
      {
        path: "/charts",
        name: "charts",
        meta: { title: "图表管理", icon: "el-icon-s-marketing" },
        component: () => import("@/views/DataManage/ChartsData.vue")
      },
      {
        path: "/form",
        name: "form",
        meta: { title: "表单管理", roles: ['superAdmin', 'admin', 'server'], icon: "el-icon-film" },
        component: () => import("@/views/DataManage/FormData.vue")
      },
    ]
  },
  {
    path: "/userManage",
    component: Layout,
    redirect: "/userData",
    hidden: true,
    children: [
      {
        path: "/userData",
        name: "userData",
        meta: { title: "账户管理", roles: ['superAdmin'], icon: "el-icon-s-custom" },
        component: () => import("@/views/UserManage/UserData.vue")
      }
    ]
  },
  {
    path: '/login',
    name: "login",
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: '/password',
    name: "password",
    component: () => import("@/views/Login/Password.vue")
  },
  {
    path: "*",
    component: () => import("@/views/NotFound.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/NotFound.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})

// 导航守卫
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == "/login" || to.path == "/password" || to.path == "/home") {
    next()
  } else {
    if (isLogin) {
      const decoded: any = jwt_decode(localStorage.tsToken);
      const { key } = decoded;
      // 权限判断
      if (hasPermission(key, to)) {
        next();
      } else {
        next('/404'); // 没有权限进入
      }
    } else {
      next('/login');
    }
  }

})

// 验证权限
function hasPermission(roles: string, route: any) {
  if (route.meta && route.meta.roles) {
    // 如果meta.roles包含角色的key值,那么就是有权限,否则无权限
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  } else {
    // 默认不设置有权限
    return true;
  }
}


export default router;
