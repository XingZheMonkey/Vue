import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER',
  SET_CITY: 'SET_CITY'
}

const state = {
  isAuthenticated: false,
  user: {},
  city:""
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  city: state => state.city
}

const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user
    else state.user = false
  },
  [types.SET_CITY](state, city) {
    if (city) state.city = city
    else state.city = false
  }
}

const actions = {
  setAuthenticated: ({
    commit
  }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({
    commit
  }, user) => {
    commit(types.SET_USER, user)
  },
  setCity:({
    commit
  },city)=>{
    commit(types.SET_CITY,city)
  },
  clearCurrentState: ({
    commit
  }) => {
    commit(types.SET_AUTHENTICATED, false)
    commit(types.SET_USER, null)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})