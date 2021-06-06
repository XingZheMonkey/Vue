<template>
  <div class="password">
    <LoginHeader>
      <div slot="form" class="form">
        <div class="title">找回密码</div>

        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left">
          <el-form-item style="margin-top:60px;" prop="name">
            <el-input placeholder="请输入账号" v-model="ruleForm.name" aria-autocomplete="off">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              placeholder="请输入邮箱"
              v-model="ruleForm.email"
              aria-autocomplete="off"
              type="text"
            >
              <i slot="prefix" class="el-input__icon el-icon-message"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              style="width:100%"
              :loading="isLoading"
              @click.native.prevent="send"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import LoginHeader from "./LoginHeader.vue";

@Component({
  components: {
    LoginHeader
  }
})
export default class Password extends Vue {
  @Provide() isLoading: Boolean = false;

  @Provide() ruleForm: {
    name: String;
    email: String;
  } = {
    name: "",
    email: ""
  };

  @Provide() rules = {
    name: [{ required: true, message: "请输入账号", trigger: "blur" }],
    email: [
      { required: true, message: "请输入邮箱", trigger: "blur" },
      { type: "email", message: "请输入正确的邮箱地址", trigger: "blur,change" }
    ]
  };

  send(): void {
    (this.$refs.ruleForm as any).validate((valid: boolean) => {
      if (valid) {
        this.isLoading = true;
        (this as any).$axios
          .post("/api/user/findPassword", this.ruleForm)
          .then((res: any) => {
            this.isLoading = false;
            this.$message({
              type:"success",
              message:res.data.msg
            })
            this.$router.push("/login")
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
}
</style>