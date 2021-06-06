<template>
  <div class="register">
    <div class="header">
      <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
      <div class="title">注册账号</div>
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
export default {
  name: "register",
  components: {
    inputGroup,
    commonButton
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
        alert("请输入合法的邮箱地址");
        return;
      }

      if (this.user.password !== this.user.passwordAgain) {
        this.$message.error("两次密码不一致")
      }else{
        axios.post("/api/users/register",this.user)
           .then(data=>{
            this.$message.success("注册成功")
            console.log(data)

            setTimeout(()=>{
              this.$router.push("/login")
            },1000)
            
           })
           .catch(err=>{
            //  提示接口中的错误信息
             this.$message.error(err.response.data)
           })
      }
    }
  }
};
</script>
<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 50px;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
  color: #20af0e;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.title {
  margin-top: 30px;
  font-size: 22px;
  text-align: center;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
