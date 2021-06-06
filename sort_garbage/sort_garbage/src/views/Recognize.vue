<template>
  <div class="regonize">
    <!-- 头部导航 -->
    <nHeader title="智能查询"></nHeader>

    <!-- 循环提示消息 -->
    <van-notice-bar color="#1989fa" background="#ecf9ff" mode="link">您可以输入垃圾类型查看对应分类，或者上传一张图片进行智能识别</van-notice-bar>

    <!-- 搜索框 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @focus="focus" />

    <!-- 图片上传 -->
    <div class="upload">
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="1"
        preview-size="350px"
        upload-text="请选择一张图片"
        capture="camera"
      />
    </div>

    <!-- 触发按钮 -->
    <van-button type="primary" class="btn" @click="showPopup">开始识别</van-button>

    <!-- 弹出层 -->
    <van-popup v-model="show" class="popup">
      <div class="popupTitle">垃圾报告</div>
      <div class="ul">
        <table>
          <tr style="background:#f5f7f9;color:#657180;">
            <td>识别结果</td>
            <td>匹配度</td>
            <td>垃圾类型</td>
          </tr>
          <tr v-for="res in result">
            <td>{{res.keyword}}</td>
            <td>{{res.score}}</td>
            <td>{{res.type}}</td>
          </tr>
        </table>
      </div>
      <div style="float:right;margin-top:10px;color: #7d7e80;font-size:13px;">Tip : 查询结果仅供参考</div>
    </van-popup>

    <!-- 加载动画 -->
    <van-loading
      v-if="isLoading"
      size="42px"
      vertical
      type="spinner"
      color="#1989fa"
      style="z-index:10;position:absolute;top:40%;left:32%;"
    >正在生成报告,请耐心等待...</van-loading>

    <!-- 遮罩层 -->
    <van-overlay :show="overlayShow" />

    <!-- 底部导航 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../components/TabBar";
import nHeader from "../components/Header";
export default {
  name: "regonize",
  data() {
    return {
      value: "",
      fileList: [], // 上传的图片信息
      isLoading: false, // 是否显示加载动画
      show: false, // 是否显示弹出层
      overlayShow: false, // 是否显示遮罩层
      result: {}, // 存储查询结果
      flag: 0, // 监听是否匹配完成
      temResult: [], // 临时结果集，等待垃圾类型匹配完毕后赋值给最终结果集
      state: false // 是否查询成功
    }
  },
  components: {
    tabbar,
    nHeader
  },
  methods: {
    focus() {
      this.$router.push("/search");
    },
    showPopup() {
      // 判断是否上传了图片
      if (!this.fileList[0]) {
        this.$notify({
          type: "warning",
          message: "请先上传一张需要识别的图片",
          duration: 3000
        });
      } else {
        this.isLoading = true; // 显示加载动画
        this.overlayShow = true; // 显示遮罩层

        this.$axios
          .post("http://localhost:2728/api/recognize", {
            image: this.fileList[0].content
          })
          .then(res => {
            // 重构数组，将匹配到的垃圾类型遍历到数组中
            this.temResult = res.data.map(item => {
              this.$axios
                .post(`/api/quark_sug?q=${item.keyword}是什么垃圾`)
                .then(res => {
                  if (
                    !res.data.data.value ||
                    !("style" in res.data.data.value[0])
                  ) {
                    item.type = "未知";
                  } else {
                    item.type = res.data.data.value[0].style.answer; // 将查询到的垃圾类型添加到对象中
                  }
                })
                .then(res => {
                  this.flag++;
                });
              return item;
            });

            // 设置计时器监听flag变化，以确定何时显示报告结果
            const timer = setInterval(() => {
              if (this.flag == 5) {
                this.result = this.temResult; // 将结果集赋值到result中

                this.isLoading = false; // 停止加载动画
                this.show = true; // 显示查询结果
                this.overlayShow = false; // 显示遮罩层

                this.state = true; // 将查询状态设置为成功

                this.flag = 0; // 将flag重新置0

                clearInterval(timer); // 清空计时器
              }
            }, 500);
          })
          .catch(err => {
            // 若15秒内查询不出结果，自动报错
            const errorTimer = setInterval(() => {
              // 查询失败将进行的操作
              if (!this.state) {
                this.isLoading = false;
                this.overlayShow = false;
                this.$notify({
                  type: "danger",
                  message: "图片不符合规格，查询失败",
                  duration: 3000
                });
              }
              clearInterval(errorTimer);
            }, 3000);
          });
      }
    }
  }
};
</script>

<style scoped>
.upload {
  width: 350px;
  height: 350px;
  margin: 30px auto;
}
.btn {
  float: right;
  margin-right: 10px;
}
.title {
  color: rgba(69, 90, 100, 0.6);
  font-size: 14px;
  margin-left: 13px;
}
.popup {
  width: 88%;
  margin: 0 auto;
  padding: 20px 10px;
}
.list {
  border: 1px solid #ebedf0;
  padding: 16px 8px;
  color: #7d7e80;
  font-size: 12px;
}
.ul {
  margin-top: 10px;
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dbdbdb;
}
tr > td {
  padding: 8px 10px;
  font-size: 12px;
  text-align: center;
  color: #363636;
  border-bottom: 1px solid #dbdbdb;
}
.popupTitle {
  text-align: center;
  color: #7d7e80;
  margin-bottom: 20px;
}
</style>