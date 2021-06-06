<template>
  <div id="news">
    <nHeader :title="title" style="position:fixed">
      <div slot="back">&lt;</div>
    </nHeader>

    <div class="content">
        <div class="title">
            {{info.title}}
        </div>
        <div class="author">
            {{info.author}} {{info.time}}
        </div>
      <article>{{info.content}}</article>
    </div>
  </div>
</template>

<script>
import nHeader from "./Header";
export default {
  name: "news",
  components: {
    nHeader
  },
  props:{
      info:{
          type:Object
      },
      title:{
          type:String
      }
  }
};
</script>

<style lang="less" scoped>
#news {
  overflow: hidden;
  .content {
    padding: 10px;
    margin-top: 50px;
    article {
      line-height: 23px;
    }
    .title{
        font-size: 22px;
        margin-bottom: 10px;
    }
    .author{
        color: #b1b2b4;
        font-size: 13px;
        margin-bottom: 15px;
    }
  }
}
</style>