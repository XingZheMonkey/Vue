<template>
  <div class="userinfo">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <div class="avatar">
        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt />
      </div>

      <h4 class="username">{{getUser.name}}</h4>
    </div>

    <div class="account">
      <h2 class="title">Account</h2>

      <el-form :model="userData" class="form-box">
        <el-form-item label="账号">
          <el-input v-model="getUser.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userData.password"></el-input>
        </el-form-item>

        <el-button
          type="primary"
          @click="modify"
          :loading="isLoading"
          :disabled="!userData.password"
        >修改密码</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
@Component({
  components: {}
})
export default class UserInfo extends Vue {
  @Getter("user") getUser: any;

  @Provide() userData: {
    name: String;
    password: String;
  } = {
    name: "",
    password: ""
  };

  @Provide() isLoading: boolean = false;

  modify() {
    this.userData.name = this.getUser.name;
    this.isLoading = true;

    (this as any).$axios
      .post("/api/user/changePassword", this.userData)
      .then((res: any) => {
        this.isLoading = false;
        this.$message({
          message: res.data.msg,
          type: "success"
        });
      })
      .catch(() => {
        this.isLoading = false;
      });
  }
}
</script>

<style lang="less" scoped>
// 公共样式
.common {
  height: 937px;
  background: #fff;
  border: 1px solid #e6e6e6;
  margin: 10px;
  padding: 10px;
}
.title {
  margin: 20px 0 50px 20px;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
}

.userinfo {
  display: flex;
  .img-box {
    width: 400px;
    .common;
    .username {
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
    .avatar {
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }
  }

  .account {
    width: 1250px;
    .common;
  }

  .form-box {
    padding: 25px;
  }
}
</style>