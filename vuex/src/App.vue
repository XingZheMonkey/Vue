<template>
  <div id="app">
    <product-one ></product-one>
    <product-two ></product-two>
  </div>
</template>

<script>
import productOne from './views/productOne.vue'
import productTwo from './views/productTwo.vue'

export default {
  name: 'app',
  components: {
    'product-one':productOne,
    'product-two':productTwo
  },
  data(){
    return {
      
    }
  }
}
</script>

<style>

</style>
