<template>
	<div class="container-fluid">
		<div class="row">
		    <div class="col-md-5">
		    	<div class="list-group">

				  	<router-link class="list-group-item mt" :to="{name:'contactLink'}">联系我们</router-link>

				  	<router-link class="list-group-item mt" :to="{name:'deliveryLink'}">快递信息</router-link>

				    <router-link class="list-group-item mt" :to="{name:'newsLink'}">新闻</router-link>

					<router-link class="list-group-item mt" :to="{name:'historyLink'}">历史记录</router-link>

				</div>
		    </div>

		    <div class="col-md-7">
		    	<router-view></router-view>
		    </div>
		</div>
	</div>
	
</template>

<script>

export default {
  
  data(){
  	return {
  		
  	}
  }
}
</script>

<style scoped>
	.mt{
		margin-top: 20px;
		height: 50px;
		line-height: 30px;
	}
</style>

				  
				  