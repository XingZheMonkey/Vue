<template>
  <div>
    <div v-if="endVerify">
      <div v-if="passVerify" class="reset">
        <div class="reset-header"></div>
        <div class="reset-form">
          <div class="reset-title">Reset Password</div>
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

          <Button color="#fff" backgroundColor="#409eff" @click="resetPass"
            >重置密码</Button
          >
          <div class="otherOption">
            <router-link class="forget" tag="span" to="/login"
              >又想起来了></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else>loading</div>
  </div>
</template>

<script>
import Button from "@components/Button/Button.vue";
import Input from "@components/Input/Input.vue";
import { resetPassword, verifyReset } from "@/utils/actions.js";
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
      endVerify: false,
      passVerify: false,
    };
  },
  methods: {
    async resetPass() {
      if (!this.user.password) {
        this.$generate(Message, {
          message: "请输入密码",
          duration: 2000,
          type: "fail",
        }).show();
        return;
      }

      if (this.user.password !== this.user.passwordAgain) {
        this.$generate(Message, {
          message: "两次密码不一致",
          duration: 2000,
          type: "fail",
        }).show();
        return;
      }

      try {
        const res = await resetPassword(this.user);

        if (res.type == "success") {
          this.$router.push("/login");
        } else {
          this.$generate(Message, {
            message: res.msg,
            duration: 2000,
            type: "fail",
          }).show();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  async created() {
    //   解析url，将内容还原
    let href = decodeURIComponent(window.location.href.replace(/%20/g, "+"));
    let params = href.substring(href.indexOf("?") + 1);
    let parseToArray = params.split("&");

    // 将 url 中的参数提取出来
    this.user.email = parseToArray[0].substring(
      parseToArray[0].indexOf("=") + 1
    );
    let key = parseToArray[1].substring(parseToArray[1].indexOf("=") + 1);

    let keyJosn = {
      key
    }

    try {
      const res = await verifyReset(keyJosn);

      // 检测密钥中的时间是否在有效期呢
      if (res.verify) {
        // 结束loading
        this.endVerify = true;
        this.passVerify = true;
      } else {
        this.$router.replace("/notFound");
      }
    } catch (e) {
      this.$router.replace("/notFound");
    }
  },
};
</script>

<style scoped lang="less">
.reset {
  height: 100%;
  width: 100%;
  overflow: hidden;
  user-select: none;
  .reset-form {
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
    .reset-title {
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