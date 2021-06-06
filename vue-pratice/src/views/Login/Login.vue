<template>
  <div class="login">
    <div class="login-header"></div>
    <div class="login-form">
      <div class="login-title">Login</div>
      <Input type="text" placeholder="username" v-model="user.email" />
      <Input type="password" placeholder="password" v-model="user.password" />
      <Button color="#fff" backgroundColor="#409eff" @click="login"
        >登录</Button
      >
      <div class="otherOption">
        <div class="autoLogin">
          <input type="checkbox" id="autoLogin" v-model="autoLogin" />
          <label for="autoLogin">七天内自动登录</label>
        </div>
        <div>
          <router-link class="forget" tag="span" to="/forgetPassword"
            >忘记密码 </router-link
          >/<router-link class="forget" tag="span" to="/register">
            注册</router-link
          >
        </div>
      </div>
      <div class="thirdParty">
        <svg-icon class="github" iconClass="github" @click="toGithub" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@components/Button/Button.vue";
import Input from "@components/Input/Input.vue";
import { login } from "@/utils/actions.js";
import jwt_decode from "jwt-decode";
import Message from "@components/Message/Message.vue";
export default {
  components: {
    Button,
    Input
  },
  data() {
    return {
      autoLogin: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    toGithub() {
      // oAuth
      window.open("http://localhost:5030/user/github/login", "_self");
    },
    async login() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.user.email)) {
        this.$generate(Message, {
            message: "请输入合法邮箱",
            duration:3000,
            type:'warn'
          }).show()
        return;
      }

      try {
        const res = await login(this.user);

        if (res.type == "success") {
          // this.$generate(Message, {
          //   message: res.msg,
          //   duration:500,
          //   type:'success'
          // }).show()

          localStorage.setItem("eleToken", res.token);

          const userInfo = jwt_decode(res.token);

          await this.$store.dispatch("setUser", userInfo);

          await this.$store.dispatch('setRouterList',userInfo.key)

          this.$router.push("/");
         
        } else {
           this.$generate(Message, {
            message: res.msg,
            duration:2000,
            type:'fail'
          }).show()
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
  .login-form {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    margin: 200px auto 0;
    input {
      margin-top: 40px;
    }
    .login-title {
      text-align: center;
    }
    button {
      margin-top: 30px;
    }
    .otherOption {
      font-size: 14px;
      color: #606266;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      input {
        margin: 0 3px 0 0;
      }
      .autoLogin {
        display: flex;
        align-items: center;
        input,
        label {
          cursor: pointer;
        }
      }
      .forget {
        color: #409eff;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .thirdParty {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;

      span {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .github {
        width: 32px;
        height: 32px;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>