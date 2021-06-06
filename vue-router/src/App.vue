<template>
<div id="app">
  <!-- 导航 -->
  <div class="container">
    <appHeader></appHeader>
  </div>
  
  <!-- 路由显示 -->
  <div class="container">
      <router-view></router-view>
  </div>

   <!-- 路由复用 -->
  <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <router-view name="delivery"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="news"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
          <router-view name="history"></router-view>
        </div>
      </div>
  </div>

</div>
  

  
</template>

<script>
import Header from './components/Header'

export default {
  
  components: {
    "appHeader":Header
  }
}
</script>

<style>

</style>
