<template>
  <div class="users">
  	
    <ul>
    	<li v-for="user in users">
    		<h1>{{user.name}}</h1>
			<h3>{{user.email}}</h3>
    	</li>
    </ul>
  </div>
</template>


<!-- 

	传值: string number boolean
	注意：传值不会改变父级中数据的值，触发更改只会改变当前组件的值

	引用: array object
	注意：传引用会改变父级中数据的值，即在一个组件内改变，则会改变所有调用此数据组件内的值，类似于c语言中的传址

 -->


<script>
export default {
  name: 'users',
  // 父级向子级传值，子级用props接收
  props:{
  	users:{
  		type:Array,
  		required:true
  	}
  },

  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 
	
	 scoped域为局部样式作用域
-->
<style scoped>
  	.users{
		width:100%;
		max-width: 1200px;
		margin:40px auto;
		box-sizing: border-box;
  	}
  	ul{
  		display: flex;
  		flex-wrap: wrap;
  		list-style: none;
  		padding: 0;
  	}
  	li{
  		flex-grow: 1;
  		flex-basis: 200px;
  		text-align: center;
  		padding: 30px;
  		border:1px solid #222;
  		margin:10px;
  	}
</style>
