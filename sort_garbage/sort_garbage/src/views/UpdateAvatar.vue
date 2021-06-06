<template>
  <div>
    <!-- 头部 -->
    <nHeader title="个人头像">
      <div slot="back">&lt;</div>
    </nHeader>

    <div class="avatar">
      <van-uploader v-model="fileList" multiple :max-count="1" preview-size="300px" />
      <div class="btn">
        <div @click="()=>this.$router.go(-1)">取消</div>
        <div @click="update">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import nHeader from "../components/Header";
export default {
  name: "avatar",
  components: {
    nHeader
  },
  data() {
    return {
      fileList: [{ url: "",isImage: true }]
    };
  },
  methods: {
    update() {
      if ("content" in this.fileList[0]) {
        this.$axios.post(`http://localhost:2728/api/user/updateAvatar/${this.$store.getters.user.id}`,{avatar:this.fileList[0].content})
             .then(()=>{
                 this.$router.push("/user")
             })
      }
      this.$router.go(-1)
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$axios
      .get(
        "http://localhost:2728/api/user/userInfo/" + this.$store.getters.user.id
      )
      .then(data => {
        this.fileList[0].url = data.data.avatar;
      });
  }
};
</script>

<style scoped>
.avatar {
  padding: 30px;
}
.btn {
  margin-top: 20px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  color: #7d7e80;
  font-size: 14px;
}
.btn div {
  cursor: pointer;
}
.back {
  float: left;
  font-size: 18px;
  color: #7d7e80;
  margin-left: 10px;
}
.title {
  display: inline-block;
  margin-left: -30px;
}
</style>