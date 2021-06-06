# vuex

1. state  

  ```
    // store.js

    state:{
      msg:"从vuex中获取的数据"
    }

    // 组件内引用
    
    computed:{
      msg(){
        return this.$store.state.msg;
      }
    }
  ```

2. getters

  ```
  getters:{
    item(state)=>(i)=>{
      return lists[i]
    }
  }
  ```

3. mutations  
 
 > vuex 中的数据只能调用 mutations 更改 , 且只能做同步操作 

  ```
  // store.js

  mutations:{
    addNum(state,payload){
      state.count+=payload.num;
    }
  }
  
  // 组件内调用

  methods:{
    addCount(){
      // this.$store.commit('addNum',{num:5});

      this.$store.commit({
        type:"addNum",
        num:5
      })
    }
  }
  ```

 4. actions  

   > 异步提交 mutations

    ```
    // store.js

    mutations:{
      addNum(state,num){
        state.count+=num;
      }
    }

    actions:{
      addCountAsync({commit},payload){
        setTimeout(()=>{
          commit('addNum',payload.num);
        },1000)
      }
    }

    // 组件内调用

    methods:{
      asyncAdd(){
        this.$store.dispatch('addCountAsync',{num:5})
      }
    }

    ```


## 完整示例

```
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
```
