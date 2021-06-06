# 生命周期

```
  	beforeCreate:function () {
  		alert("组件实例化之前执行的函数")
  	},
  	created:function () {
  		alert("组件实例化完毕，但页面还未显示")
  	},
  	beforeMount:function () {
  		alert("组件挂载前，页面仍未展示，但虚拟dom已经配置")
  	},
  	mounted:function () {
  		alert("组件挂载后，此方法执行，页面显示")
  	},
  	beforeUpdate:function () {
  		alert("组件更新前，页面仍未更新，但虚拟dom已经配置")
  	},
  	updated:function(){
  		alert("组件更新后,此方法执行，页面显示")
  	},
  	beforeDestory:function(){
  		alert("组件销毁前")
  	},
  	destoryed:function(){
  		alert("组件销毁")
  	}
```

注意：jquery代码要写在生命周期mount中，因为挂载完成dom结构才会成型