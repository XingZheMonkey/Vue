<template>
  <section class="add">
    <div class="title">Create New Game</div>

    <!-- 编辑区域 -->
    <div class="game">
      <div class="input">
        <h2 class="gametitle" style="margin-bottom:10px;">Game Category</h2>
        <p class="helper" style="margin-bottom:10px;">you can choose one or more categories, or create a new one by input</p>
        <el-select
          v-model="arrayCategory"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="choose a category"
          style="width:100%;border-bottom:1px solid #8c8c8c"
        >
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </div>

      <div class="input">
        <h2 class="gametitle">Game Title</h2>
        <p class="helper">You should input the Game Title in here</p>
        <cv-text-input v-model="newGame.gameTitle" placeholder="Game Title"></cv-text-input>
      </div>

      <div class="input">
        <h2 class="gametitle">Correct Path</h2>
        <p class="helper">You should input the correct path in here,and Separate words by commas</p>
        <cv-text-area rows="2" cols="50" placeholder="Correct Path" v-model="newGame.correctPath"></cv-text-area>
      </div>

      <div class="input">
        <h2 class="gametitle">Random term</h2>
        <p
          class="helper"
        >You should input the random term in here,and Separate words by commas,if message is more than one line text should wrap</p>
        <cv-text-area rows="6" cols="50" placeholder="Random term" v-model="newGame.distractors"></cv-text-area>
      </div>

      <!-- 编辑区域结束 -->

      <!-- 创建按钮 -->
      <cv-button @click="create">Create Game</cv-button>

      <!-- 取消按钮 -->
      <router-link to="/">
        <cv-button style="margin-left:30px;">Cancel</cv-button>
      </router-link>

      <!-- 异常离开提示 -->
      <cv-modal
        :visible="visibleDouble"
        @modal-shown="actionShownDouble"
        @modal-hidden="actionHiddenDouble"
        @primary-click="actionPrimary"
        @secondary-click="actionSecondary"
      >
        <template slot="title">Reminder</template>

        <template slot="content">
          <p>The information you entered has not been saved yet. Would you like to leave this page?</p>
        </template>
        <template slot="secondary-button">Confirm to leave</template>
        <template slot="primary-button">Stay on this page</template>
      </cv-modal>

      <!-- 加载图 -->
      <cv-loading v-if="show" :active="active" :overlay="overlay"></cv-loading>

      <!-- 错误提醒 -->
      <cv-modal :visible="visible" @modal-shown="actionShown" @modal-hidden="actionHidden">
        <!-- 具名插槽应用  <slot name="title"></slot> -->
        <template slot="title">Reminder</template>

        <template slot="content">
          <p>Incomplete information,Please save after completing the information</p>
        </template>
      </cv-modal>
      <!-- 错误提醒结束 -->
<!-- 
      <button @click="test">didid</button> -->
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newGame: {
        gameTitle: "",
        correctPath: "",
        distractors: "",
        category: ""
      },
      arrayCategory:[],
      active: true,
      overlay: true,
      show: false,
      visible: false,
      visibleDouble: false,
      flag: false,
      options: [
          'category one',
          'category two',
          'category three'
      ],
    }
  },
  methods: {
    create() {
      // 将数组打成字符串
      this.newGame.category=this.arrayCategory.join();

      this.flag = true;  // 导航守卫用

      if (
        !this.newGame.category ||
        !this.newGame.correctPath ||
        !this.newGame.distractors ||
        !this.newGame.gameTitle
      ) {
        this.visible = true; // 显示提醒框
      } else {
        this.show = true; // 显示加载图
        this.axios
          .post("/api/game/add/", this.newGame)
          .then(res => {
            setTimeout(() => {
              this.show = false; // 将加载图复原
              this.$router.push("/");
            }, 500);
          })
          .then(err => {
            console.log(err);
          });
      }
    },
    test() {
      // let val=this.arrayCategory.join(',');
      // console.log(val);
    },
    actionShown() {
      this.visible = true;
    },
    actionHidden() {
      this.visible = false;
      this.flag = false;  // 由于每次点击create按钮，flag都会为true，所以要在此模态框的关闭按钮触发时将flag调回false
    },
    actionShownDouble() {
      this.visibleDouble = true;
    },
    actionHiddenDouble() {
      this.visibleDouble = false;
    },
    actionPrimary() {
      this.visibleDouble = false;
    },
    actionSecondary() {
      this.flag = true;
      this.visibleDouble = false;
      this.$router.push("/");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.newGame.correctPath ||
      this.newGame.distractors ||
      this.newGame.gameTitle
    ) {
      this.visibleDouble = true;
      if (this.flag) {
        next();
      }
    } else {
      next();
    }
  }
};
</script>
<style scoped>
.add {
  margin: 50px auto;
  max-width: 900px;
  padding-top: 30px;
}
.add .title {
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
a {
  text-decoration: none;
}
</style>
