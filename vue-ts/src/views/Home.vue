<template>
  <div class="home">
    <div class="shadow">
      <div class="title">少儿教育辅导管理系统</div>
      <div class="motto">少儿教育指定的后台管理系统</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 820px;
  background: url("../assets/bg.jpg");

  .shadow {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    text-align: center;
    padding: 100px;
    box-sizing: border-box;
    .title {
      font-size: 32px;
      font-weight: bold;
      line-height: 60px;
      margin-top: 90px;
    }
    .motto {
      margin: 60px 0;
      font-size: 20px;
    }
  }
}
</style>