<template>
  <div id="news">
    <Info title="新闻资讯" :info="infomation"></Info>
  </div>
</template>

<script>
import Info from "../components/Info";
export default {
  name: "news",
  components: {
    Info
  },
  data() {
    return {
      id: this.$route.params.id,
      infomation: {}
    };
  },
  created() {
    this.$axios
      .get(`http://localhost:2728/api/news/newsContent/${this.id}`)
      .then(res => {
        this.infomation = res.data;
      });
  }
};
</script>
