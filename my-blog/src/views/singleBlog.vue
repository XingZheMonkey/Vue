<template>
  <div id="single-blog">
    <h1>{{blogMessage.title}}</h1>
    <article>{{blogMessage.body}}</article>
    <cv-button
      kind="danger"
      :small="small"
      :disabled="disabled"
      @click="deleteBlog"
      :icon="icon"
      style="margin-top:20px;"
    >删除此博客</cv-button>

    <cv-toast-notification
      v-if="visible"
      kind="success"
      :title="title"
      :sub-title="subTitle"
      :caption="caption"
      @close="doClose"
    ></cv-toast-notification>
  </div>
</template>

<script>
export default {
  name: "single-blog",
  data() {
    return {
      // 从路由处获取id
      id: this.$route.params.id,
      blogMessage: {},
      visible: false,
      small: false,
      disabled: false,
      icon: null,
      title: "delete successful",
      subTitle: "a blog",
      caption: "close and back to show"
    };
  },
  created() {
    // 获取指定id的数据内容,并将请求到的数据赋值给blogMessage

    this.$http
      .get("http://localhost:3000/user/" + this.id)
      .then(function(data) {
        this.blogMessage = data.body;
      });
  },
  methods: {
    deleteBlog() {
      this.$http
        .delete("http://localhost:3000/user/" + this.id)
        .then(data => {
          this.visible = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    doClose() {
      this.visible = false;
      this.$router.push({ name: "show" });
    }
  }
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-size: 20px;
  font-family: Georgia, "Times New Roman", Times, serif;
  background: #eee;
  border: 1px dotted #aaa;
}
</style>