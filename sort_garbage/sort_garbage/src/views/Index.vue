<template>
  <div class="index">
    <nHeader title="首页"></nHeader>

    <!-- 城市 -->
    <van-dropdown-menu class="chooseCity" style="background:#fafafa;">
      <van-dropdown-item v-model="value" :options="option" @change="changeCity" />
    </van-dropdown-menu>

    <!-- 寄语 -->
    <div class="message">
      <div class="message-title">城市寄语</div>
      <div style="display:flex;">
        <img :src="getImg" style="width:300px;margin:0 auto" alt />
      </div>

      <article>{{getMotto}}</article>
    </div>

    <!-- 资讯 -->
    <van-tabs v-model="active" color="#fff">
      <van-tab title="城市资讯" style="text-align:left;">
        <div class="tab">
          <div class="news" v-if="newsList" v-for="news in newsList">
            <span class="news-title">
              <router-link :to="'/news/'+ news._id" tag="div">{{news.title}}</router-link>
              <div class="author">{{news.author}} {{news.time}}</div>
            </span>
            <img :src="news.imgPath" alt />
          </div>
        </div>
      </van-tab>
      <van-tab disabled>
        <!-- 占位 -->
      </van-tab>
    </van-tabs>

    <!-- tabbar -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/TabBar";
import nHeader from "../components/Header";
export default {
  name: "index",
  data() {
    return {
      lat: "",
      lng: "",
      value: 0,
      active: 0,
      newsList: [],
      recommandList: [],
      option: []
    };
  },
  components: {
    tabbar,
    nHeader
  },
  computed: {
    getMotto() {
      let motto;
      this.option.forEach(item => {
        if (item.value == this.value) {
          motto = item.motto;
        }
      });
      return motto;
    },

    getImg() {
      let img;
      this.option.forEach(item => {
        if (item.value == this.value) {
          img = item.img;
        }
      });
      return img;
    }
  },
  methods: {
    changeCity(value) {
      this.$store.dispatch("setCity", this.option[this.value].text);
    }
  },
  created() {
    // 获取城市列表
    this.$axios.get("/api/city").then(res => {
      this.option = res.data;
    });
  },
  updated() {
    this.option.forEach(item => {
      if (item.text == this.$store.getters.city) {
        this.value = item.value;
      }
    });

    // 获取新闻列表
    this.$axios
      .get(`http://localhost:2728/api/news/${this.option[this.value]._id}`)
      .then(res => {
        this.newsList = res.data;
      });
  }
};
</script>

<style lang="less" scoped>
::v-deep .van-tab {
  text-align: left;
  margin-left: 10px;
}
.index {
  overflow: hidden;
  width: 100%;

  .chooseCity {
    width: 20%;
  }
  .message {
    width: 90%;
    margin: 6px auto;
    font-size: 13px;
    background: #fff;
    color: #303133;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    .message-title {
      border-bottom: 1px solid #ebeef5;
      font-size: 16px;
      height: 30px;
      padding: 3px 20px;
      color: rgba(69, 90, 100, 0.6);
    }
    article {
      margin-top: 10px;
      padding: 10px 20px;
    }
  }

  .tab {
    width: 100%;
    height: 340px;
    padding: 10px;
    overflow: scroll;
    .news {
      height: 100px;
      width: 95%;
      border-bottom: 1px solid #d1d3d8;
      display: flex;
      background: #fff;
      .news-title {
        margin-top: 10px;
        .author {
          margin-top: 10px;
          font-size: 12px;
          color: #b1b2b4;
        }
      }
      & img {
        margin-left: 20px;
        width: 140px;
        height: 80px;
        margin-top: 10px;
        flex-shrink: 0;
      }
    }
    .one {
      border-top: 1px solid #d1d3d8;
    }
  }
}
</style>