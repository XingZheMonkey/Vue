<template>
  <div class="edit">
    <div class="title">Edit Game</div>

    <div class="game">
      <!-- 标题 -->
      <h2 class="path">{{singleGame.gameTitle}}</h2>

      <!-- 分割线 -->
      <hr class="path" />

      <!-- 编辑部分 -->
      <div class="input">
        <h2 class="gametitle" style="margin-bottom:10px;">Game Category</h2>
        <el-select
          v-model="options"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="choose a category"
          style="width:100%;border-bottom:1px solid #8c8c8c"
        >
          <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>

      
      <div class="input">
        <h2 class="gametitle">Correct Path</h2>
        <p class="helper">You can update the correct path in here,and Separate words by commas</p>
        <cv-text-area
          rows="2"
          cols="50"
          placeholder="Correct Path"
          :value="singleGame.correctPath"
          v-model="singleGame.correctPath"
        >{{singleGame.correctPath}}</cv-text-area>
      </div>

      <div class="input">
        <h2 class="gametitle">Disturbing term</h2>
        <p
          class="helper"
        >You can update the distractors in here,and Separate words by commas,if message is more than one line text should wrap</p>
        <cv-text-area
          rows="6"
          cols="50"
          placeholder="Disturbing term"
          :value="singleGame.distractors"
          v-model="singleGame.distractors"
        ></cv-text-area>
      </div>
      <!-- 编辑部分结束 -->

      <cv-button @click="save">Save</cv-button>

      <!-- 取消按钮 -->
      <router-link to="/">
        <cv-button style="margin-left:30px;">Cancel</cv-button>
      </router-link>

      <!-- 加载图 -->
      <cv-loading v-if="show" :active="active" :overlay="overlay"></cv-loading>
    </div>
  </div>
</template>
<script>
export default {
  name: "edit",
  data() {
    return {
      id: this.$route.params.id, // 动态路由参数
      singleGame: {},
      active: true,
      overlay: true, // 加载图是否覆盖页面
      show: false, // 加载图显示与否
      options:[]
    };
  },
  methods: {
    save() {
      this.show = true;  // 显示加载图

      this.singleGame.category=this.options.join();  // 将数组打成字符串

      this.axios
        .post("/api/game/edit/" + this.id, this.singleGame)
        .then(res => {
          setTimeout(() => {
            this.show = false;
            this.$router.push("/");
          }, 500);
        });
    }
  },
  created() {
    this.axios.get("/api/game/" + this.id).then(res => {
      this.singleGame = res.data;
      this.options=res.data.category.split(',');  // 将字符串切割成数组
      console.log(this.singleGame);
    });
  }
};
</script>
<style scoped>
.edit {
  margin: 50px auto;
  max-width: 900px;
  padding-top: 30px;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
}
.game {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: white;
}
.gametitle {
  font-size: 20px;
}
.helper {
  margin-top: 8px;
  font-style: italic;
}
.input {
  margin-bottom: 30px;
}
.path {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 20px 0;
  font-style: italic;
}
a {
  text-decoration: none;
}
</style>

