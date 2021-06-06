<template>
  <div class="register">
    <nHeader style="border-bottom:1px solid rgb(225,221,221);" title="用户注册">
      <div slot="back">&lt;</div>
    </nHeader>
    
    <div class="container">
      <div class="content">
        <form action>
          <inputGroup label="昵称" placeholder="例如：孙悟空" v-model="user.name" />
          <inputGroup label="邮箱" placeholder="请输入邮箱" v-model="user.email" />

          <inputGroup label="密码" placeholder="请输入密码" type="password" v-model="user.password" />

          <inputGroup
            label="确认密码"
            placeholder="请再次输入密码"
            type="password"
            v-model="user.passwordAgain"
          />
        </form>
        <div class="btn_wrap">
          <commonButton :disabled="isDisabled" @click="registerClick">注册</commonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputGroup from "../components/inputGroup";
import commonButton from "../components/commonButton";
import nHeader from "../components/Header";
export default {
  name: "register",
  components: {
    inputGroup,
    commonButton,
    nHeader
  },
  computed: {
    isDisabled() {
      if (
        this.user.password &&
        this.user.email &&
        this.user.name &&
        this.user.passwordAgain
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        passwordAgain: ""
      },
      status: Boolean
    };
  },
  methods: {
    registerClick() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.user.email)) {
        this.$notify({
          type: "warning",
          message: "请输入合法的邮箱地址"
        });
        return;
      }

      if (this.user.password !== this.user.passwordAgain) {
        this.$notify({
          type: "warning",
          message: "两次密码不一致"
        });
      } else {
        this.$axios
          .post("http://localhost:2728/api/user/register", this.user)
          .then(data => {
            this.$router.push("/login");
          })
          .catch(err => {
            //  提示接口中的错误信息
            this.$notify({
              type: "warning",
              message: err.response.data
            });
          });
      }
    },
    back() {
      this.$router.go(-1);
    }
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
  margin-left: -30px;
}
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: white;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
