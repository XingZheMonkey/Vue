<template>
  <div class="leftMenu">
    <el-row class="tac">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#457fb1"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <router-link to="/home">
            <el-menu-item index="0">
              <i class="el-icon-menu" style="color:white;"></i>
              <span class="slot">首页</span>
            </el-menu-item>
          </router-link>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user" style="color:white;"></i>
              <span>人物管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title"></template>
              <router-link to="/monkey">
                <el-menu-item index="1-1">孙悟空</el-menu-item>
              </router-link>
              <el-menu-item index="1-2">猪八戒</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/place">
            <el-menu-item index="2">
                <i class="el-icon-menu" style="color:white;"></i>
                <span slot="title">场景管理</span>
            </el-menu-item> 
          </router-link>
          <router-link to="/setting">
            <el-menu-item index="4">
                <i class="el-icon-setting" style="color:white;"></i>
                <span slot="title">设置</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {};
  }
};
</script>

<style scoped>
.leftMenu {
  position: absolute;
  left: 8px;
  top: 79.3px;
  min-height:92.5%;
  background-color: #457fb1;
  z-index: 99;
}
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>

