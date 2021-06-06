<template>
  <div id="product-two">
    <h2>Product List Two</h2>
    <ul>
    	<li v-for="product in products" :key="product">
    		<span>{{product.name}}</span>
    		<span class="price">${{product.price}}</span>
    	</li>
    </ul>
  </div>
</template>

<script>


export default {
  // 获取store中的数据
  computed:{
  	products(){
  		return this.$store.state.products;
  	},
  }
  // props:{
  // 	products:{
  // 	   type:Array
  // 	}
  // },
}
</script>

<style scoped>
	#product-two{
		background: #D1E4FF;
		margin:0 auto;
		box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
		margin-bottom: 30px;
		padding: 10px 20px;
		max-width: 800px;
	}
	#product-two ul{
		padding: 0;
		list-style: none;
	}
	#product-two li{
		margin-left: 10px;
		margin-top: 10px;
		padding: 20px;
		background: rgba(255,255,255,0.7);
	}
	.price{
		font-weight: bold;
		color: #860CE8;
		display: block;
	}
</style>