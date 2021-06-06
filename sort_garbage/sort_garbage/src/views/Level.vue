<template>
  <div class="level">
    
    <!-- 头部 -->
    <nHeader title="等级说明">
      <div slot="back">&lt;</div>
    </nHeader>
    <!-- 头部结束 -->

    <!-- 内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="tl" style="margin:20px 0;">等级表</div>
      <table cellpadding="0" cellspacing="0" class="table">
        <tr>
          <td>等级</td>
          <td>积分要求</td>
          <td>等级头衔</td>
          <td>等级说明</td>
        </tr>
        <tr>
          <td>Lv.0</td>
          <td>0</td>
          <td>有害垃圾</td>
          <td>对地球具有一定危害性</td>
        </tr>
        <tr>
          <td>Lv.1</td>
          <td>50</td>
          <td>湿垃圾</td>
          <td>可被分解的有机垃圾，易腐烂</td>
        </tr>

        <tr>
          <td>Lv.2</td>
          <td>160</td>
          <td>干垃圾</td>
          <td>难以回收</td>
        </tr>

        <tr>
          <td>Lv.3</td>
          <td>270</td>
          <td>可回收物</td>
          <td>可循环再生，有一定的价值</td>
        </tr>
      </table>
      <!-- 表格结束 -->

      <!-- 细则 -->
      <div class="tl" style="margin:20px 0;">等级说明</div>
      <div class="intruduce">
        <div class="io">
          <van-icon name="medel" size="1.5em" color="#fbcc00" class="io_award" />
          <div class="io_title">[等级] 代表您对垃圾分类了解的几个阶段</div>
          <div class="io_tra"></div>
        </div>
        <div class="io_content">
            1.用户通过答题测试获取积分，每道题分值为10
            <br>
            2.等级越高，解锁的试题与难度会有相应变化 
            <br>
            3.等级划分并无实际依据，仅供娱乐参考
            <br>
            4.试题有限，如需了解更多分类，请选择智能查询
        </div>
      </div>
      <!-- 细则结束 -->
    </div>
    <!-- 内容结束 -->
  </div>
</template>

<script>
import nHeader from "../components/Header";
export default {
  name: "level",
  components: {
    nHeader
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.back {
  float: left;
  font-size: 18px;
  color: #7d7e80;
  margin-left: 10px;
}
.content {
  padding: 6px;
}
.title {
  display: inline-block;
}
.table {
  width: 100%;
  margin-top: 10px;
  background: white;
}
td {
  width: 80px;
  text-align: center;
  font-size: 12px;
  height: 35px;
  border-bottom: 1px solid rgb(219, 219, 219);
}
td:nth-of-type(4) {
  width: 200px;
}
tr:nth-of-type(2) {
  background: #fcd0d3;
  color: #a51920;
}
tr:nth-of-type(3) {
  background: #9deeb2;
  color: #10642a;
}
tr:nth-of-type(4) {
  background: #ffd000;
  color: #523501ea;
}
tr:nth-of-type(5) {
  background: #b3e6ff;
  color: #0058a1;
}
.tl {
  color: rgba(69, 90, 100, 0.6);
  font-size: 14px;
}
.io {
  background-color: #eedda5;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  margin: 3px 0;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  display: flex;
}
.io_title {
  flex: 1;
  line-height: 25px;
  color: #a95f42;
  font-size: 13px;
  padding-left: 10px;
  width: 26px;
  height: 26px;
}
.io_award {
  background: white;
  border-radius: 50%;
  padding: 4px;
}
.io_tra {
  border-left: 12.5px dashed transparent;
  border-right: 12.5px solid #fafafa;
  border-bottom: 12.5px dashed transparent;
  border-top: 12.5px dashed transparent;
  height: 0;
  width: 0;
  font-size: 0;
  line-height: 0;
}
.io_content{
    font-size: 0.7em;
    margin-left: 4px;
    margin-top: 10px;
    line-height: 20px;
}
</style>