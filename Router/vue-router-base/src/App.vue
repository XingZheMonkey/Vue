<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/">hello</router-link>
    <br>
    <router-link to="/about">about</router-link>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 100px;
}
a{
  font-size: 24px;
  text-decoration: none;
}
</style>
