<template>
  <div class="register">
    <div class="register-header"></div>
    <div class="register-form">
      <div class="register-title">Register</div>
      <Input
        type="text"
        placeholder="please input email"
        v-model="user.email"
      />
      <Input
        type="password"
        placeholder="please input password"
        v-model="user.password"
      />
      <Input
        type="password"
        placeholder="please input password agign"
        v-model="user.passwordAgain"
      />

      <Button color="#fff" backgroundColor="#409eff" @click="register"
        >注册</Button
      >
      <div class="otherOption">
        已有账号？<router-link class="forget" tag="span" to="/login"
          >立即登录</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@components/Button/Button.vue";
import Input from "@components/Input/Input.vue";
import { register } from "@/utils/actions.js";
import Message from "@components/Message/Message.vue";
export default {
  components: {
    Button,
    Input,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        passwordAgain: "",
      },
    };
  },
  methods: {
    async register() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.user.email)) {
        this.$generate(Message, {
            message: '请输入合法邮箱',
            duration:2000,
            type:'fail'
          }).show()
        return;
      }

      if (!this.user.password) {
        this.$generate(Message, {
            message: '请输入密码',
            duration:2000,
            type:'fail'
          }).show();
        return;
      }

      if (this.user.password !== this.user.passwordAgain) {
        this.$generate(Message, {
            message: '两次密码不一致',
            duration:2000,
            type:'fail'
          }).show();
        return;
      }

      try {
        const res = await register(this.user);

        if (res.type == 'success') {
          this.$router.push("/login");
        }else{
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
.register {
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
  .register-form {
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
    .register-title {
      text-align: center;
    }
    button {
      margin-top: 30px;
    }
    .otherOption {
      font-size: 14px;
      color: #606266;
      margin-top: 10px;
      input {
        margin: 0 3px 0 0;
      }
      .forget {
        color: #409eff;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>