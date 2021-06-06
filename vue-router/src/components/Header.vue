<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/">
          <span class="glyphicon glyphicon-leaf"></span>
          Pizza点餐系统
        </a>
      </div>

      
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">

          <!-- 
            <li>
              <router-link tag="div" to="/">首页</router-link>
            </li>  

            tag可以设置router-link产生的标签,默认是a
          -->

          <!-- 1.动态绑定路径，通过data数据 -->
          <li><router-link :to="HomeLink">首页</router-link></li>
          
          <!-- 2.动态绑定路径，通过定义路由名称 -->
          <li><router-link :to="{name:'menuLink'}">菜单</router-link></li>
          
          <!-- 3.静态绑定路径 -->
          <li><router-link to="/Admin">管理</router-link></li>
          <li><router-link to="About">关于我们</router-link></li>
        </ul>
        
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/Login">登录</router-link></li>
          <li><router-link to="/Register">注册</router-link></li>
        </ul>

      </div>
    </div>
</nav>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      HomeLink:"/"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
