<template>
  <div class="layout-header">
    <el-row>
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="22">
        <div class="system-info">
          <img class="logo" src="../../assets/logo.png" alt />
          <span class="title">少儿教育</span>
        </div>
      </el-col>
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="2">
        <el-dropdown @command="userCommand" class="system-user">
          <span class="userinfo-inner">
            <span style="color:white">{{getUser.key}}</span>
            <el-avatar
              class="avatar"
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class LayoutHeader extends Vue {
  @Getter("user") getUser: any;

  created() {
    
  }
  userCommand(command: string): void {
    if (command == "logout") {
      localStorage.removeItem("tsToken");
      this.$router.push("/login");
    }

    if (command == "usercenter") {
      this.$router.push("/userInfo");
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  background: rgb(0, 0, 0);
  line-height: 64px;
  height: 64px;

  .system-info {
    width: 200px;
    height: 64px;
    display: flex;
    margin-left: 20px;
    align-items: center;

    .title {
      margin-left: 10px;
      font-size: 20px;
      color: white;
      font-weight: 600;
    }

    .logo {
      width: 27%;
      height: 80%;
    }
  }
  .system-user {
    float: right;
    margin-right: 10px;
    .userinfo-inner {
      display: flex;
      align-items: center;

      .avatar {
        margin-left: 10px;
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #eee;
      }
    }
  }
}
</style>