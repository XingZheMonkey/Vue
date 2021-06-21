<template>
  <div class="navHeader">
    <div class="title">{{$t('header.title')}}</div>
    <ul class="menu">
      <Dropdown :listItem="userOption" @changeValue="userAction">
        <div v-if="!isLogin" class="user">
          <svg-icon
            v-if="theme == 'whiteTheme'"
            class="user"
            iconClass="user"
          ></svg-icon>
          <svg-icon v-else class="user" iconClass="user" fill="white"></svg-icon>
        </div>
        <div v-else class="avatar">
          <span class="avatarSqua">
            <img :src="$store.state.user.avatar" alt="" />
          </span>
        </div>
      </Dropdown>

      <Dropdown
        :listItem="languageOption"
        @changeValue="changeLanguage($event)"
      >
        <span>{{$t('header.language')}}</span>
      </Dropdown>

      <!-- 父级定义方法，控制 数据 变更，子级传递 相对应数据 -->
      <Dropdown :listItem="themeOption" @changeValue="changeTheme($event)">
        <span>{{$t('header.theme')}}</span>
      </Dropdown>
    </ul>
  </div>
</template>

<script>
import Dropdown from "@components/DropDown/Dropdown";
// import { resetRouter } from "@/router/index";
export default {
  components: {
    Dropdown,
  },
  props: {
    theme: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      isLogin: false,
      languageOption: [
        { name: "", key: 1, value: "zh" },
        { name: "", key: 2, value: "en" },
      ],
      themeOption: [
        { name: "", key: 3, value: "whiteTheme" },
        { name: "", key: 4, value: "blackTheme" },
      ],
      userOption: [
        { name: "", key: 5, value: "login" },
        { name: "用户中心", key: 6, value: "userCenter" },
      ]
    };
  },
  // watch:{
    // '$i18n.locale'(){
    //   console.log(this.i18n)
    // }
    // '$store.state':{
    //   handler(){
    //     console.log(this.$i18n)
    //   },
    //   deep:true
    // }
  // },
  watch:{
    '$store.state':{
      handler(){
        this.languageOption[0].name = this.$t('header.china');
        this.languageOption[1].name = this.$t('header.english');
        this.themeOption[0].name = this.$t('header.white');
        this.themeOption[1].name = this.$t('header.black');
        this.userOption[0].name = this.$t('header.login');
      },
      deep:true
    }
  },
  methods: {
    changeTheme(value) {
      this.$store.dispatch("setTheme", value);
    },
    changeLanguage(value) {
      this.$store.dispatch("setLanguage", value);
      this.$i18n.locale = value;
    },
    userAction(value) {
      if (value == "login") {
        this.$router.push("/login");
      } else if (value == "logout") {
        // resetRouter();
        localStorage.removeItem("eleToken");
        this.$store.dispatch("clearCurrentState");
        this.$router.push("/login");
      } else if (value == "uerCenter") {
        this.$router.push("/userCenter");
      }
    },
  },
  created() {
    if (localStorage.eleToken) {
      this.isLogin = true;
      this.userOption[0].name = this.$t('header.logout');
      this.userOption[0].value = "logout";
    } else {
      this.isLogin = false;
      this.userOption[0].name = this.$t('header.login');
      this.userOption[0].value = "login";
    }
  },
};
</script>

<style lang="less" scoped>
@import "@/common/color.less";
.navHeader {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  .title {
    font-weight: 600;
  }
  .menu {
    display: flex;
    .avatar {
      font-size: 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .avatarSqua {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      img {
        width: 130%;
      }
    }
    .user {
      width: 30px;
      height: 30px;
    }
  }
}

.whiteTheme .navHeader {
  background: @white-background;
  border-bottom: 1px solid @white-border-color;
  color: @white-font-color;
}
.blackTheme .navHeader {
  background: @black-background;
  color: @white-background;
  border-bottom: 1px solid @black-border-color;
}
</style>
