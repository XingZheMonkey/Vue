<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  created() {
    // *** 因为数据是在登陆成功时存储到vuex中，可是页面刷新就会清空vuex，但不会去清空localstorage , 显然不可能刷新页面就重新登录， 因此在入口文件app中声明存储，每次刷新页面都会执行存储操作
    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);
      //token存储到VueX中
      this.$store.dispatch("setUser", decode);

      this.$store.dispatch('setRouterList',decode.key)
    }
    this.$i18n.locale = this.$store.state.language
  }
};
</script>

<style>
body,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
* {
  box-sizing: border-box;
  user-select: none;
}
</style>
