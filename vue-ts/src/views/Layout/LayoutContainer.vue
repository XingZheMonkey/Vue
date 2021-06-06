<template>
  <el-container class="layout-content">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>

    <!-- 右侧页面 -->
    <el-main>
      <div class="top">
        <i class="el-icon-s-unfold"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in breadCrumbItems" :key="index" :to="{path:item.path}">
            {{item.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 页面内容 -->

      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  @Provide() breadCrumbItems: any;

  @Watch("$route") handleRouteChange(to:any){
    this.initBreadCrumbItems(to);
  }

  created() {
    this.initBreadCrumbItems(this.$route);
  }

  initBreadCrumbItems(router: any) {
    let breadCrumbItems: any = [{ path: "/", title: "后台管理系统" }];
    for (let index in router.matched) {
      if (router.matched[index].meta && router.matched[index].meta.title) {
        breadCrumbItems.push({
          path: router.matched[index].path
            ? router.matched[index].path
            : "/",
          title:router.matched[index].meta.title
        });
      }
    }
    this.breadCrumbItems=breadCrumbItems;
  }
}
</script>

<style lang="less" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  i {
    font-size: 25px;
    margin: 0 10px 0 20px;
  }
  .el-main {
    padding: 0;
    .top {
      height: 54px;
      border-right: none;
      display: flex;
      align-items: center;
      background: #fff;
    }
  }
}
</style>