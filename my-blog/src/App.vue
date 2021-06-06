<template>
  <div id="app">
    <blog-header></blog-header>
    <router-view></router-view>
    <!-- <show-blog></show-blog> -->
  </div>
</template>

<script>
import addBlog from './views/addBlog.vue'
import showBlog from './views/show.vue'
import header from './views/header.vue'

export default {
  name: 'app',
  data(){
    return {
      
    }
  },
  methods:{
   
  },
  components: {
    "add-blog":addBlog,
    "show-blog":showBlog,
    "blog-header":header
  }
}
</script>

<style>

</style>
