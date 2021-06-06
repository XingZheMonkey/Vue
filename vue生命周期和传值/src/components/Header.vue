<template>
  <header @click="changeParentTitle()">
  	<h1>{{title}} {{parentTitle}}</h1>
  </header>
</template>

<script>
export default {
  name: 'app-header',
  // 接收父级传递的title
  props:{
  	parentTitle:{
  		type:String
  	}
  },
  data () {
    return {
      "title":"Vue.js Demo"
    }
  },
  methods:{
  	changeParentTitle:function(){
  		// 由于父级传递的是值，而不是引用，此方法只会改变本组件内的值
  		this.parentTitle="已被修改"
  	}
  },
  // 生命周期
  // beforeCreate:function () {
  // 	alert("组件实例化之前执行的函数")
  // },
  // created:function () {
  // 	alert("组件实例化完毕，但页面还未显示")
  // },
  // beforeMount:function () {
  // 	alert("组件挂载前，页面仍未展示，但虚拟dom已经配置")
  // },
  // mounted:function () {
  // 	alert("组件挂载后，此方法执行，页面显示")
  // },
  // beforeUpdate:function () {
  // 	alert("组件更新前，页面仍未更新，但虚拟dom已经配置")
  // },
  // updated:function(){
  // 	alert("组件更新后,此方法执行，页面显示")
  // },
  // beforeDestory:function(){
  // 	alert("组件销毁前")
  // },
  // destoryed:function(){
  // 	alert("组件销毁")
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  	header{
  		background:lightgreen;
  		padding: 10px;
  	}
  	h1{
  		color: #222;
		text-align: center;
  	}
</style>
