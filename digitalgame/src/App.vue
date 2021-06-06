<template>
  <div id="app">
    <headerNav></headerNav>
    <router-view />
  </div>
</template>
<script>
import headerNav from "./components/header";
export default {
  components: {
    headerNav
  }
};
</script>

<style>
#app,
body,
html {
  width: 100%;
  height: 100%;
  background: #eee;
}
</style>
