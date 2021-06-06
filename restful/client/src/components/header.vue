<template>
  <header class="headNav">
    <el-row>
      <el-col :span="22" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt />
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="2" class="user">
        <el-avatar
          style="margin-left:80px;"
          size="medium"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <el-dropdown style="position:absolute;top:25px;">
          <span class="el-dropdown-link" style="color:white;">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/info">
              <el-dropdown-item style="font-size: 12px;">个人信息</el-dropdown-item>
            </router-link>
            <router-link to="/login">
              <el-dropdown-item style="font-size: 12px;">logout</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: "headNav",
  data() {
    return {
      user: {}
    };
  },
  methods: {}
};
</script>

<style scoped>
.headNav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  color: #fff;
  background: #457fb1;
  border-bottom: 1px solid #4178be;
}
.logo-container {
  line-height: 60px; /*通过行高设置一下文字垂直居中*/
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  border-radius: 50%; /*把logo边角去掉，圆形logo*/
  vertical-align: middle; /*垂直居中*/
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  margin-top: 14px;

}
a{
  text-decoration: none;
}
</style>


