import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import router, {
  asyncRoutes,
  routes
} from "@/router/index"
import {
  filterAsyncRouter
} from "@/utils/setData"

import {fetchUser } from "@/utils/actions"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    theme: "blackTheme",
    language: "chinese",
    routesList: routes
  },
  mutations: {
    set_theme(state, theme) {
      state.theme = theme
    },
    set_language(state, language) {
      state.language = language
    },
    set_user(state, user) {
      state.user = user
    },
    set_routesList(state, routesList) {
      state.routesList = routesList
    }
  },
  actions: {
    setTheme: ({
      commit
    }, theme) => {
      commit('set_theme', theme)
    },
    setLanguage: ({
      commit
    }, language) => {
      commit('set_language', language);
    },
    setUser: async ({
      commit
    }, user) => {
      const completeUserInfo = await fetchUser(user.id)
      commit('set_user', completeUserInfo)
    },
    setRouterList: ({
      commit
    }, key) => {
      let accessedRouters = filterAsyncRouter(asyncRoutes, key);

      // 利用 addRoute 向路由表中添加路由
      accessedRouters.forEach(route => {
        router.addRoute(route)
      })

      // 由于 addRoutes 不会直接向 routes 中添加路由，需要额外针对 routes 生成一个显示侧边栏需要的路由结构
      let routesList = Object.assign([],router.options.routes) 
      routesList.push(...accessedRouters);

      routesList = [...new Set(routesList)]

      commit('set_routesList', routesList)
    },
    clearCurrentState: ({
      commit
    }) => {
      commit('set_user', null)
      commit('set_routesList', null)
    }
  },
  // vuex-persistedstate 默认使用 localStorage 来固化数据
  plugins: [persistedState({
    // 部分持久化
    paths: ['language', 'theme']
  })]
})




export default store