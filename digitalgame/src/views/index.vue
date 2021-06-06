<template>
  <div class="index">
    <!-- 内容区域 -->
    <section class="sec">
      <div class="title">Existing game</div>

      <!-- 遍历后台数据，填充到页面 -->
      <div class="game" v-for="game in games">
        <h1 style="display:inline-block;">{{game.gameTitle}}</h1>

        <cv-tag v-if="game.state" kind="green" label="Enable" style="margin-left:20px;"></cv-tag>
        <cv-tag v-else kind="red" label="Disabled" style="margin-left:20px;"></cv-tag>

        <el-tooltip placement="top">
          <div slot="content">
            <div v-for="item in game.category.split(',')">{{item}}</div>
          </div>
          <el-button>2</el-button>
          <div class="el-badge item">
            <p class="el-button el-button--small"  style="background:#92eeee;color:#006161;">
              <span>category</span>
              <i class="el-icon-s-operation"></i>
            </p>
          </div>
        </el-tooltip>

        <div class="el-badge item">
          <p class="el-button el-button--small">
            <span>Tryouts</span>
          </p>
          <sup
            class="el-badge__content el-badge__content--undefined is-fixed"
            style="z-index:10;"
          >{{game.views | maxNumber}}</sup>
        </div>

        <div class="el-badge" style="margin-left:25px;">
          <p class="el-button el-button--small" style="background:#e6d6ff;color:#6e32c9;">
            <span>comments</span>
          </p>
          <sup
            class="el-badge__content el-badge__content--undefined is-fixed"
          >{{game.comments | maxNumber}}</sup>
        </div>

        <router-link :to="'/edit/'+game._id">
          <cv-button
            style="float:right;margin-left:10px;"
            kind="tertiary"
            :small="small"
            :disabled="btnActive"
          >Edit</cv-button>
        </router-link>

        <cv-button
          style="float:right;"
          kind="tertiary"
          :small="small"
          :disabled="btnActive"
          @click="change(game._id,game.state)"
        >{{game.state ? "Disable" : "Enable"}}</cv-button>
        <!-- 用三元运算符解决文字切换问题，用事件传参将点击项的属性取出来 -->
      </div>
      <!-- 遍历结束 -->

      <router-link to="/add">
        <cv-button>
          create new game
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            style="will-change: transform;"
            xmlns="http://www.w3.org/2000/svg"
            class="bx--btn__icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8.5 7.5V3h-1v4.5H3v1h4.5V13h1V8.5H13v-1z" />
          </svg>
        </cv-button>
      </router-link>
    </section>
    <!-- 内容区域结束 -->
  </div>
</template>

<script>
import Filter16 from "@carbon/icons-vue/es/filter/16";
export default {
  data() {
    return {
      btnActive: false,
      small: true,
      games: [],
      EditId: null, // 存储被点击项的id
      EditState: null
    };
  },
  components: {
    Filter16
  },
  filters: {
    // 过滤大于999的数字
    maxNumber(value) {
      if (value > 999) {
        return "999+";
      } else {
        return value;
      }
    }
  },
  methods: {
    change(_id, state) {
      // 获取被点击项的id和状态
      this.EditId = _id;
      this.EditState = !state; // 将获取到的点击项的状态取反，并存储

      this.axios
        .get("/api/game/" + this.EditId) // 首先获取单个数据
        .then(response => {
          this.axios
            .post("/api/game/edit/" + this.EditId, {
              // 修改数据
              state: this.EditState,
              category:response.data.category,
              gameTitle: response.data.gameTitle,
              correctPath: response.data.correctPath,
              distractors: response.data.distractors
            })
            .then(res => {
              console.log(res.data);
            });
        });
    }
  },
  created() {
    this.axios.get("/api/game/").then(response => {
      this.games = response.data;
      console.log(this.games);
    });
  },
  updated() {
    this.axios.get("/api/game/").then(response => {
      this.games = response.data;
    });
  }
};
</script>

<style scoped>
.sec {
  margin: 50px auto;
  max-width: 900px;
  padding-top: 30px;
}
.sec .title {
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
.game h1 {
  font-size: 20px;
  font-weight: bold;
}
a {
  text-decoration: none;
}
.el-badge {
  position: relative;
  vertical-align: middle;
  display: inline-block;
  margin-left: 10px;
}
.el-button {
  display: inline-block;
  line-height: 1;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #054ada;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  background: #c9deff;
}
.el-button--small {
  padding: 6px 9px 6px 9px;
  font-size: 12px;
  border-radius: 30px;
}
.el-badge__content.is-fixed {
  position: absolute;
  top: 0;
  right: 15px;
  transform: translateY(-50%) translateX(100%);
}
.el-badge__content {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}
sup {
  vertical-align: super;
}
</style>