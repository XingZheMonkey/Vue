<!-- 模板:html结构 -->
<template>
  <div id="home">

    <!-- 调用子组件 -->
    <app-header v-bind:parentTitle="parentTitle"></app-header>

    <!-- 为Users组件绑定父级组件定义的值，以便向下传递 -->
    <Users v-bind:users="users"></Users>

    <app-Footer v-bind:parentTitle="parentTitle"></app-Footer>

  </div>
</template>


<!-- 行为：处理逻辑 -->
<script>

// 1.局部注册组件
import Users from './Users'
import Header from './Header'
import Footer from './Footer'

export default {
  name: 'home',
  data(){
    return{
      users:[],
      // 测试传值效果
      parentTitle:"传值操作效果 (number String boolean)"
    }
  },

  //2.组件内声明
  components: {   
    // 注意:不允许使用html已有标签命名,如p,li
    // 注意:不允许使用驼峰式命名标签，w3c规定标签名只能小写
    Users,
    "app-header":Header,
    "app-Footer":Footer
  },

  created:function(){

    // 使用http访问接口数据
    this.$http.get("http://jsonplaceholder.typicode.com/users").then((data)=>{
      // 将接口内数据赋值给users
      this.users=data.body;
    })
  }

}
</script>


<!-- 样式:解决样式 -->
<style>
    
</style>
