<template>
  <footer>
  	<p>{{copyright}} {{parentTitle}}</p>
  </footer>
</template>

<script>
export default {
  name: 'app-Footer',
  // 接收父级传递的title
  props:{
    parentTitle:{
      type:String
    }
  },
  data () {
    return {
      "copyright":"copyright 2017 vue.js Demo "
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  	footer{
  		background:#222;
  		padding: 6px;
  	}
  	p{
  		color: lightgreen;
		  text-align: center;
  	}
</style>
