<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt_decode from "jwt-decode"
export default {
  name: "app",
  created() {

    // *** 因为数据是在登陆成功时存储到vuex中，可是页面刷新就会清空vuex，但不会去清空localstorage , 显然不可能刷新页面就重新登录， 因此在入口文件app中声明存储，每次刷新页面都会执行存储操作

    if (localStorage.eleToken) {
      const decode = jwt_decode(localStorage.eleToken);

      //token存储到VueX中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }


    // *** 将位置获取操作放在index页面时，路由切换会导致不断重新获取位置，因此存放在入口文件app中，只有页面刷新才会重新获取，而不是路由更新时

    // 获取当前经纬度
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    let that = this;

    function showPosition(position) {
      // 根据经纬度获取当前位置
      that.$axios
        .get(
          `http://localhost:2728/api/location?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        )
        .then(posi => {

          that.$store.dispatch("setCity",posi.data.result.address_component.city.substring(0,2))

          
        });
    }

  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  background: #fafafa;                                                 
}
</style>
