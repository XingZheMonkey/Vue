<template>
	<div class="row">

    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>Monkey king</h1>
        <h2>花果山水帘洞齐天大圣孙悟空</h2>
        <button @click="goToMenu" class="btn btn-success">Let's Go Menu</button>
      </div>
    </div>
		
	</div>
</template>

<script>
export default {
  methods:{
  	goToMenu:function(){
  		// 1.跳转到上一次浏览的页面
  	    // this.$router.go(-1)
  	    
  	    // 2.跳转到指定地址
  	    // this.$router.replace('/menu')
  	    
  	    // 3.跳转到指定路由的名称下
  	    // this.$router.replace({name:'menuLink'})
  	    
  	    // 4.通过push进行跳转
  	    // this.$router.push('/menu')
  	    this.$router.push({name:"menuLink"})
  	    
  	}
  }
  
}
</script>

<style>
  #home{
    background: url("../assets/bg.jpg");
    height: 85vh;
    background-size: 100%;
    padding: 10%;
  }
  h1,h2{
    margin:6%;
  }
  .background{
    background: #eee;
    opacity: 0.8;
    max-width: 70vw;
    padding:20px 0;
    margin:0 auto;
  }
</style>