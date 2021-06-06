<template>
  <div class="user">
    <nHeader title="个人信息"></nHeader>

    <!-- 个人信息 -->
    <div class="info">
      <!-- 未登录状态 -->
      <div class="login" v-if="!isLogin">
        <van-image round width="3.5rem" height="3.5rem" class="avatar" />
        <div class="nickName"></div>
        <div class="set">
          <van-button plain color="#7d7e80" class="login_btn" size="mini" @click="login">登录</van-button>
        </div>
      </div>

      <!-- 登陆状态 -->
      <div class="login" v-if="isLogin">
        <van-image
          round
          width="3.5rem"
          height="3.5rem"
          :src="user.avatar"
          class="avatar"
          @click="avatar"
        />
        <div class="nickName">{{user.name}}</div>
        <div class="set">
          <van-icon name="setting-o" @click="set" />
        </div>
      </div>
    </div>

    <!-- 成就等级 -->
    <div class="achieve">
      <!-- 等级 -->
      <div class="level">
        <div class="l_title">我的等级</div>
        <div class="l_nick">Lv.{{level}}</div>
      </div>

      <!-- 分割线 -->
      <div class="hr" style="height:14px;"></div>
      <div class="hr" style="height:18px;"></div>
      <div class="hr" style="background:#08abab;opacity:0.3;height:22px;width:1px;"></div>

      <!-- 积分 -->
      <div class="score">
        <div class="l_title">我的积分</div>
        <div class="l_nick">{{user.sumScore}}</div>
      </div>

      <!-- 规则 -->
      <div class="rule" @click="rule">等级介绍</div>
    </div>

    <!-- 评分 -->
    <div class="mark" @click="rate">
      <div class="m_label">
        <van-icon name="like" color="rgb(255, 210, 30)" style="margin-left:10px;" />
        <span style="flex:1;margin-left:10px;">评分</span>
        <div class="m_rlink">></div>
      </div>
    </div>

    <!-- 小程序码 -->
    <div class="mark" style="margin-top:5px;" @click="min">
      <div class="m_label">
        <van-icon name="wechat" color="#44b549" style="margin-left:10px;" />
        <span style="flex:1;margin-left:10px;">小程序码</span>
        <div class="m_rlink">></div>
      </div>
    </div>

    <!-- 客服 -->
    <div class="mark" style="margin-top:5px;" @click="service">
      <div class="m_label">
        <van-icon name="service" color="#054ada" style="margin-left:10px;" />
        <span style="flex:1;margin-left:10px;">联系客服</span>
        <div class="m_rlink">></div>
      </div>
    </div>
    <br />

    <!-- 评分窗口 -->
    <van-popup v-model="showRate" position="bottom" class="rate">
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">评分</van-divider>
      <van-rate allow-half v-model="value" icon="like" void-icon="like-o" :readonly="isRate" />
      <div class="tip" v-if="isRate">感谢您的衷心评价</div>
      <br />
      <van-button
        v-if="!isRate"
        plain
        color="#1989fa"
        size="mini"
        class="submitRate"
        @click="submitRate"
      >提交</van-button>
    </van-popup>

    <!-- 脚部导航 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/TabBar";
import nHeader from "../components/Header";
export default {
  name: "user",
  data() {
    return {
      isLogin: false,
      showRate: false,
      value: 3,
      score: 0,
      level: 0,
      user: {},
      isRate: false // 是否进行了评价，根据isRate设置提交按钮的显示与否，以及评分的可写性
    };
  },
  components: {
    tabbar,
    nHeader
  },
  methods: {
    set() {
      this.$router.push("/setting");
    },
    rule() {
      this.$router.push("/level");
    },
    rate() {
      if (localStorage.eleToken) {
        this.showRate = true;
      } else {
        this.$router.push("/login");
      }
    },
    min() {
      console.log("点击了小程序");
    },
    service() {
      if (localStorage.eleToken) {
        console.log("点击了客服");
      } else {
        this.$router.push("/login");
      }
    },
    login() {
      this.$router.push("/login");
    },
    avatar() {
      this.$router.push("/avatar");
    },
    submitRate() {
      // 调用评分接口
      this.$axios
        .post("http://localhost:2728/api/rate/submit", {
          score: this.value,
          id: this.$store.getters.user.id
        })
        .then(res => {
          // 将评分界面隐藏，并提示成功消息
          this.showRate = false;
          this.$notify({ type: "success", message: res.data });
          this.isRate = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // 判断是否登录,如果登录则拿到用户信息
    if (localStorage.eleToken) {
      this.isLogin = true;

      // 拿到用户信息
      this.$axios
        .get(
          "http://localhost:2728/api/user/userInfo/" +
            this.$store.getters.user.id
        )
        .then(data => {
          this.user = data.data;

          if (this.user.sumScore > 50 && this.user.sumScore < 160) {
            this.level = 1;
          } else if (this.user.sumScore >= 160 && this.user.sumScore < 270) {
            this.level = 2;
          } else if (this.user.sumScore >= 270) {
            this.level = 3;
          }
        })
        .catch(err => {
          console.log(err);
        });

      // 判断用户是否已经进行过评价
      this.$axios
        .get(
          `http://localhost:2728/api/rate/isRate/${this.$store.getters.user.id}`
        )
        .then(res => {
          if (!res.data) {
            // 如果传回来false，代表没评价过，启动提交按钮
            this.isRate = false;
          } else {
            // 如果传回来值，代表已评价过，显示数据库传来的评分，并关闭提交按钮，将评分设置为只读
            this.value = res.data.score;
            this.isRate = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  updated() {
    // 判断是否登录,如果登录则拿到用户信息
    if (localStorage.eleToken) {
      this.isLogin = true;

      this.$axios
        .get(
          "http://localhost:2728/api/user/userInfo/" +
            this.$store.getters.user.id
        )
        .then(data => {
          this.user = data.data;
        });
    }
  }
};
</script>

<style scoped>
.info {
  width: 100%;
  height: 60px;
  margin-top: 5px;
  background: white;
  border-bottom: 1px solid #eee;
}
.login {
  display: flex;
}
.avatar {
  margin-left: 14px;
}
.nickName {
  margin-left: 10px;
  height: 60px;
  line-height: 60px;
  flex: 1;
}
.set {
  height: 100%;
  line-height: 60px;
  margin-right: 20px;
  cursor: pointer;
}
.achieve {
  width: 96%;
  height: 160px;
  background: #92eeee;
  opacity: 0.8;
  margin: 7px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.level {
  width: 100px;
  text-align: center;
  flex: 1;
  margin-left: 15%;
}
.score {
  width: 100px;
  text-align: center;
  flex: 1;
}
.l_title {
  font-size: 14px;
  font-weight: 100;
  margin-bottom: 6px;
  color: #006161;
}
.l_nick {
  color: #006161;
}
.hr {
  background: #08abab;
  opacity: 0.3;
  width: 1px;
  margin-right: 3px;
}
.rule {
  color: #006161;
  font-size: 10px;
  align-self: flex-start;
  text-decoration: underline;
  margin-top: 10px;
  margin-right: 10px;
}
.mark {
  width: 100%;
  height: 40px;
  background: white;
  font-size: 14px;
  line-height: 40px;
  color: #7d7e80;
}
.m_label {
  display: flex;
  align-items: center;
}
.m_rlink {
  margin-right: 10px;
}
.m_content {
  width: 300px;
  padding: 0 18px;
  border-radius: 6px;
  display: flex;
}
.m_content {
  flex: 1;
}
.login_btn {
  border-radius: 30px;
  padding: 0 15px;
}
.rate {
  box-sizing: border-box;
  padding: 10px;
  height: 20%;
  text-align: center;
  overflow: hidden;
}
.submitRate {
  float: right;
  margin-right: 15px;
  border: none;
}
.tip {
  color: #7d7e80;
  margin-top: 10px;
}
</style>