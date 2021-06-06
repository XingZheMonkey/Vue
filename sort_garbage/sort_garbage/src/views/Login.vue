<template>
  <div class="login">
    <!-- 头部 -->
    <nHeader style="border-bottom:1px solid rgb(225,221,221);" title="用户登录">
      <div slot="back">&lt;</div>
    </nHeader>

    <div class="form">
      <div class="content">
        <form action>
          <inputGroup label="账号" placeholder="请填写邮箱" v-model="user.email" />
          <inputGroup label="密码" placeholder="请填写密码" v-model="user.password" type="password" />
        </form>
        <div class="btn_wrap">
          <commonButton :disabled="isDisabled" @click="loginClick">登录</commonButton>
        </div>
      </div>
      <div class="footer_wrap">
        <button class="register" @click="$router.push({name:'register'});">| 注册账号 |</button>
      </div>
    </div>
  </div>
</template>


<script>
import inputGroup from "../components/inputGroup";
import commonButton from "../components/commonButton";
import nHeader from "../components/Header";
import jwt_decode from "jwt-decode";
export default {
  name: "login",
  components: {
    inputGroup,
    commonButton,
    nHeader
  },
  data() {
    return {
      user: {
        password: "",
        email: ""
      },
      status: []
    };
  },
  computed: {
    isDisabled() {
      if (this.user.email && this.user.password) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    loginClick() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.user.email)) {
        this.$notify({
          type: "warning",
          message: "请输入合法的邮箱地址"
        });
        return;
      }

      this.$axios
        .post("http://localhost:2728/api/user/login", this.user)
        .then(data => {

          // 将token存储到localStorage
          const { token } = data.data;
          localStorage.setItem("eleToken", token);

          // 解析token,将token中的内容存储到vuex中
          const decode = jwt_decode(token);

          //token存储到VueX中
          this.$store.dispatch("setAuthenticated", !this.isEmpty(decode));
          this.$store.dispatch("setUser", decode);

          // 跳转到用户界面
          this.$router.push("/user")
        })
        .catch(err => {
          // 接口中的错误信息已在请求拦截中设置好
        });
    },
    back() {
      if(this.$store.getters.user){
        this.$router.go(-1);
      }else{
        this.$router.push("/user")
      }
      
    },
    isEmpty(value) {
      // 判断是否为空的封装函数
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
}
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
.form {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}
.footer_wrap {
  position: absolute;
  left: 0;
  bottom: 16px;
  text-align: center;
  width: 100%;
  color: #888;
}
.footer_wrap .register {
  font-size: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  color: #7b8ca9;
}
.content,
.btn_wrap {
  margin-top: 60px;
}
</style>