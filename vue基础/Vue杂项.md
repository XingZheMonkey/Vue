# $nextTick

说明:在dom更新循环结束之后执行回调函数，在修改数据之后使用此方法，以在回调中获取更新之后的dom

```
mounted(){
    this.$nextTick(()=>{
    
    })
}

// 一般在mounted函数用，updated可以直接获取更新后的dom

```

# 动态路由参数

```
对应 /login?id=3
<router-link :to="{name:'login',params:{id:3}}"></router-link>

对应 /login/3
<router-link :to="{name:'login',query:{id:3}}"></router-link>
```

> this.$router 获取的就是vue-router  

> this.$route  获取的是路由的一些配置

# keep-alive

```
<kepp-alive>
    keep-alive会使组件保持活跃,不被销毁.  即跳转其他路由，再返回时，内容保持不变
</keep-alive>

```

# e.target.style

> 在标签上添加方法，会自动创建一个element参数，可以通过e.target.style设置dom
```
<div @click="fn"></div>

methods:{
    fn(e){
        e.target.style.color='red';
    }
}
```

> 如果有参数，可以通过添加 $event 传递
```
<div @click="fn(arg1,$event)">

methods:{
  fn(arg,event){
    console.log(event)
  }
}
```

# 路由元组，meta

```
{
    path:'/blog',
    component:blog,
    meta:{
        auth:true
    }
}

router.beforeEach((to,from,next)=>{
    if(to.meta.auth){
        next('/login')
    }
})

// meta可以为路由设置一些自定义属性

```


# axios 

```
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream

  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],
```
## 拦截器(可实现加载动画)

1. 请求拦截

```
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

```

2. 响应拦截

```
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

# v-for 的 key

> 涉及到diff算法，目的是加快dom的更新与操作，与虚拟dom有关

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
