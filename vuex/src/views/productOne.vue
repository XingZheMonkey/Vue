<template>
  <div id="product-one">
    <h2>Product List one</h2>
    <ul>
    	<li v-for="product in saleProducts" :key="product">
    		<span>{{product.name}}</span>
    		<span class="price">${{product.price}}</span>
    	</li>
    </ul>
    <button @click="reduce">降低收入</button>
  </div>
</template>

<script>


export default {
  // 获取store中的数据
  computed:{
    products(){
      return this.$store.state.products;
    },
    saleProducts(){
      // 引用getter中改变的数据
      return this.$store.getters.saleProducts;
    }
  },
  methods:{
    reduce:function(){
      return this.$store.state.products.forEach(product=>{
        product.price-=1;
      })
    }
  }
}
</script>

<style scoped>
  #product-one{
    background: #FFF8B1;
    margin:0 auto;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    max-width: 800px;
  }
  #product-one ul{
    padding: 0;
  }
  #product-one li{
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
  }
  .price{
    font-weight: bold;
    color: #E8800C;
  }
</style>