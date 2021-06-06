<template>
  <el-scrollbar class="el-scrollbar">
    <el-menu class="el-menu-slide" :default-active="path" router>
      <template
        v-for="item in getRouters"
        v-if="item.hidden && item.children && item.children.length>0"
      >
        <el-menu-item
          v-if="item.children.length==1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>

        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta && child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component , Vue , Watch , Provide } from "vue-property-decorator";
import { Getter, State, Action, Mutation } from "vuex-class";

@Component({
  components: {}
})
export default class Sidebar extends Vue {

  @Provide() path:any;

  @Watch("$route") change(to:any){
    this.path=to.fullPath;
    // 路径值改了，但页面没有重新渲染
  }

  @Getter("routers") getRouters: any;

  created(){
    console.log(this.getRouters)
    this.path=this.$router.currentRoute.path;
  }
}
</script>

<style scoped>
.el-menu-slide {
  height: 937px;
}
</style>