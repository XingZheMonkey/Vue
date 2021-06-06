<template>
  <div class="search">
    <!-- 头部 -->
    <nHeader  title="智能查询">
      <div slot="back">&lt;</div>
    </nHeader>

    <!-- 搜索框 -->
    <van-search
      style="box-shadow:1px 1px 2px #dddddd;border-top:none;"
      v-model="value"
      placeholder="请输入垃圾名称"
      shape="round"
      @search="onSearch"
      @click="focus"
    />

    <!-- 报告 -->
    <div class="report" v-show="showReport">
      <img :src="img[index]" alt />
      <div style="margin-left:15px;">
        <div>
          {{value}}
          <span class="answer" ref="type">[ {{result.answer}} ]</span>
        </div>
        <div class="description">{{result.description}}</div>
      </div>
    </div>

    <!-- 加载动画 -->
    <van-loading
      v-if="isLoading"
      size="42px"
      vertical
      type="spinner"
      color="#1989fa"
      style="margin-top:200px;"
    >正在生成报告...</van-loading>
  </div>
</template>
<script>
import nHeader from "../components/Header";
export default {
  name: "search",
  data() {
    return {
      value: "",
      index: 0,
      result: {},
      showReport: false,
      isLoading: false,
      img: [
        require("../assets/1.png"),
        require("../assets/2.png"),
        require("../assets/3.png"),
        require("../assets/4.png"),
        require("../assets/another.png")
      ]
    };
  },
  components: {
    nHeader
  },
  methods: {
    focus() {
      this.showReport = false; // 先清空上条记录
    },
    onSearch(e) {
      this.isLoading = true;

      this.$axios.get(`/api/quark_sug?q=${e}是什么垃圾`).then(res => {
        this.isLoading = false;

        if (!res.data.data.value || !("style" in res.data.data.value[0])) {
          this.$toast("暂无查询结果，可尝试更换关键词");
        } else {
          this.result = res.data.data.value[0].style; // 将查询结果取出来

          switch (
            this.result.answer // 根据不同类型设置样式
          ) {
            case "有害垃圾":
              this.index = 3;
              this.$refs.type.style.color = "#dd3f12";
              break;
            case "可回收垃圾":
              this.index = 0;
              this.$refs.type.style.color = "#1a8b48";
              break;
            case "湿垃圾":
              this.index = 1;
              this.$refs.type.style.color = "#117973";
              break;
            case "干垃圾":
              this.index = 2;
              this.$refs.type.style.color = "#f0ae1a";
              break;
            case "有害垃圾或干垃圾":
              this.index = 3;
              this.result.description =
                "有害垃圾或干垃圾指需要根据具体情况进行区分，例如同属于电池的纽扣电池属于有害垃圾，5号电池属于干垃圾";
              break;
            default:
              this.index = 4;
              this.$refs.type.style.color = "rgb(129, 193, 250)";
          }

          this.showReport = true; // 显示报告
        }
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 100%;
  background: white;
}
.back {
  float: left;
  font-size: 18px;
  color: #7d7e80;
  margin-left: 10px;
}
.title {
  display: inline-block;
}
.report {
  display: flex;
  align-items: center;
  margin: 10px 13px;
  padding: 10px;
  border: 1px solid rgb(129, 193, 250);
}
.report img {
  width: 100px;
  margin: 40px 0;
}
.answer {
  font-weight: 700;
}
.description {
  font-size: 12px;
  margin-top: 10px;
  line-height: 1.5;
  letter-spacing: 2px;
  color: #7d7e80;
}
</style>