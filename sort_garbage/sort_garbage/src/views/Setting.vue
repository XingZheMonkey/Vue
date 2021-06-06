zu<template>
  <div class="setting">
    <!-- 头部 -->
    <nHeader title="设置">
      <div slot="back">&lt;</div>
    </nHeader>

    <!-- 用户信息 -->
    <div class="info">
      <div class="item">修改昵称</div>
      <van-cell-group>
        <van-field v-model="user.name" clearable label="昵称" placeholder="昵称" />
      </van-cell-group>

      <div class="item">修改密码</div>
      <van-cell-group>
        <van-field type="password" v-model="newPassword" label="新密码" placeholder="请输入新密码" />
        <van-field type="password" v-model="passwordAgain" label="确认密码" placeholder="请再次输入新密码" />
      </van-cell-group>

      <div class="logout">
        <van-button plain hairline type="info" size="small" color="#1989fa" @click="modify">修改信息</van-button>
        <van-button plain hairline type="info" size="small" color="#ff976a" @click="logout">注销</van-button>
      </div>
    </div>

  </div>
</template>

<script>
import nHeader from "../components/Header";
export default {
  name: "setting",
  data() {
    return {
      user: {},
      newPassword: "",
      passwordAgain: ""
    };
  },
  components: {
    nHeader
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    logout() {

      // 清除token，重置vuex, 并返回登陆界面
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");
      this.$router.push("/login");

    },
    modify() {

      if(!this.user.name){
        this.$notify({
          type: "warning",
          message: "用户名不能为空"
        });
      }else if (this.newPassword !== this.passwordAgain) {

        this.$notify({
          type: "warning",
          message: "两次密码不一致"
        });

      } else {

        //  将新密码存储到用户对象中,事先判断新密码是否有值，因为两个密码框为空也会通过上边的if判断
        if (this.newPassword) {
          this.user.password = this.newPassword;
        }

        //  调用更新用户的接口
        this.$axios
          .post(
            "http://localhost:2728/api/user/updateInfo/" + this.user._id,
            this.user
          )
          .then(data => {

            if (this.newPassword) {

              // 如果修改了密码则清除token，重置vuex, 并重新登录
              localStorage.removeItem("eleToken");
              this.$store.dispatch("clearCurrentState");
              this.$router.push("/login");

            } else {

              // 如果没有修改密码则直接返回用户界面
              this.$router.push("/user");

            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    const id = this.$store.getters.user.id;
    this.$axios
      .get("http://localhost:2728/api/user/userInfo/" + id)
      .then(userInfo => {
        this.user = userInfo.data;
        delete this.user.password;
      });
  }
};
</script>

<style scoped>
.back {
  float: left;
  font-size: 18px;
  color: #7d7e80;
  margin-left: 10px;
}
.title {
  display: inline-block;
}
.item {
  color: rgba(69, 90, 100, 0.6);
  padding: 25px 15px 15px;
  font-size: 14px;
}
.logout {
  padding: 15px;
  margin-top: 20px;
}
.logout button {
  width: 100%;
  margin-bottom: 20px;
}
</style>