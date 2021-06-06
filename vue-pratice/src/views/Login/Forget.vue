<template>
  <div class="forget">
    <div class="forget-header"></div>
    <div class="forget-form">
      <div class="forget-title">Forget Passowrd</div>
      <Input
        type="text"
        placeholder="please input your email for reseting password"
        v-model="user.email"
      />
      <Button color="#fff" backgroundColor="#409eff" @click="findPassword"
        >确定</Button
      >
      <div class="otherOption">
        <div class="option" @click="redirect">返回登录</div>
        <div class="option" @click="$router.push('/register')">立即注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@components/Button/Button.vue";
import Input from "@components/Input/Input.vue";
import { findPassword } from "@/utils/actions.js";
export default {
  components: {
    Button,
    Input,
  },
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    async findPassword() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.user.email)) {
        alert("请输入合法邮箱");
        return;
      }

      console.log(await findPassword(this.user));
    },
    redirect() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.forget {
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
  .forget-form {
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
    .forget-title {
      text-align: center;
    }
    button {
      margin-top: 30px;
    }
    .option {
      margin-top: 10px;
      color: #409eff;
      cursor: pointer;
    }
    .otherOption {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>