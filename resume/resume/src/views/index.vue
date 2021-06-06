<template>
  <div class="index">{{text}}</div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      text: "",
      showText: `/* 您好，这是我的动态简历，希望这能够帮助您更加了解我 */ 
 /* 目标岗位:web前端 */
 我的技能
    基础: 熟练应用html/css/js/jq,以及html5,css3和es6语法
    交互: 熟练应用jquery封装的ajax方法，以及Axios
    异步: 熟悉异步工作原理，能够使用async与await,promise,generator完成异步处理
    框架: 熟练使用vue全家桶以及react全家桶进行项目构建
    api: 熟悉restful规范，能够使用nodejs结合express搭建后台接口
    数据库: 熟练操作sqlServer的增删改查，擅长使用mongoDB结合nodejs搭建接口
      `
    };
  },
  computed: {},
  created() {
    let n=0;
    let timeId=setInterval(() => {
      this.text=this.showText.substring(0,n)
      n+=1;
      if(n>this.showText.length){
          clearInterval(timeId)
      }
    },100);
    
  }
};
</script>

<style scoped>
.index {
  width: 50%;
  margin:3px auto;
  background: black;
  word-wrap:break-word;
  letter-spacing: 6px;
  line-height: 28px;
  white-space: pre-line;
  box-shadow: 1px 1px 8px rgb(59, 58, 58);
  color: white;
  padding:10px;
  border-radius: 3px;
  /* transform:skew(-3deg); */
}
</style>


