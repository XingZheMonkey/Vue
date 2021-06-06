<template>
  <div class="login">
    <LoginHeader>
      <div slot="form" class="form">
        <div class="title">账号密码登录</div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left">
          <el-form-item style="margin-top:60px;" prop="name">
            <el-input placeholder="请输入用户名" v-model="ruleForm.name" aria-autocomplete="off">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.password"
              aria-autocomplete="off"
              type="password"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              style="width:100%"
              :loading="isLoading"
              @click.native.prevent="handleLogin"
            >登录</el-button>
          </el-form-item>

          <el-form-item>
            <el-checkbox
              :model="ruleForm.autoLogin"
              :checked="ruleForm.autoLogin"
              style="float:left"
            >七天内自动登录</el-checkbox>
            <el-button type="text" class="forget" @click="$router.push('/password')">忘记密码?</el-button>
          </el-form-item>
        </el-form>
      </div>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LoginHeader from "./LoginHeader.vue";

@Component({
  components: {
    LoginHeader
  }
})
export default class Login extends Vue {
  @Action("setUser") setUser: any;

  @Provide() isLoading: boolean = false;

  @Provide() ruleForm: {
    name: String;
    password: String;
    autoLogin: boolean;
  } = {
    name: "",
    password: "",
    autoLogin: true
  };

  @Provide() rules = {
    name: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  handleLogin(): void {
    (this.$refs.ruleForm as any).validate((valid: boolean) => {
      if (valid) {
        this.isLoading = true;

        (this as any).$axios
          .post("/api/user/login", this.ruleForm)
          .then((res: any) => {
            //  存储到localStorage中
            localStorage.setItem("tsToken", res.data.token);

            //  存储到vuex中
            this.setUser(res.data.token);

            this.$router.push("/");

            this.isLoading = false;
          })
          .catch((err: any) => {
            this.isLoading = false;
          });
      }
    });
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 400px;
  height: 400px;
  margin: 200px auto;
  box-shadow: 1px 1px 8px rgb(126, 120, 120), -1px -1px 8px rgb(126, 120, 120);
  text-align: center;
  padding: 10px;
  .title {
    font-size: 20px;
    color: #575757;
    margin-top: 30px;
  }
  .forget{
    float: right;
  }
}
</style>