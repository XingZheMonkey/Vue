<template>
	<h1>Menu</h1>
</template>

<script>
	export default{
		data(){
			return {
				name:"Monkey"
			}
		},
		// // 组件内守卫，进入
		// // 注意***：beforeRouteEnter 中 route , 并不是router
		// beforeRouteEnter:(to,from,next)=>{
		// 	// *** vm 可以完成异步请求数据，否则data内数据会未加载
		// 	next(vm =>{
		// 		alert("hello "+vm.name)
		// 	})
		// },
		
		// 组件内守卫，离开
		// 注意：beforeRouteLeave 中 route , 并不是router
		beforeRouteLeave:(to,from,next)=>{
			if (confirm("确定离开吗？") == true) {
				next();
			}else{
				next(false);
			}
		}
		
	}
</script>