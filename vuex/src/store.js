import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from "./define_store.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	products:[
        {name:"马云",price:200},
        {name:"马华腾",price:100},
        {name:"马冬梅",price:50},
        {name:"马蓉",price:10},
      ]
  },
  getters:{
  	saleProducts:(state)=>{
  		var productData=state.products.map(product=>{
	        return {
	          name:"**"+product.name+"**",
	          price:product.price/2
	        }
      	});

     	return productData;
  	}
  },
  mutations: {

  },
  actions: {

  }
})
