<!-- 模板:html结构 -->
<template>
  <div id="app">
    <!-- 使用router-link实现路由跳转，不必每次刷新页面 -->
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/helloworld">helloworld</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>



<!-- 行为：处理逻辑 -->
<script>



export default {
  name: 'App',
  data(){
    return{

    }
  }

}
</script>


<!-- 样式:解决样式 -->
<style>
    
</style>
