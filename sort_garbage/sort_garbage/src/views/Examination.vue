<template>
  <div class="exam">
    <nHeader title="分类测试"></nHeader>

    <img src="../assets/swpe.jpg" alt style="width:100%;" />

    <!-- badge -->
    <div class="badge">
      <div class="order" @click="rank">
        <i class="rank"></i>
        <div class="text">排行榜</div>
      </div>
      <div class="errorTest" @click="error">
        <i class="wrong"></i>
        <div class="text">错题本</div>
      </div>
    </div>

    <!-- 答题链接 -->

    <div class="mark" style="margin-top:20px;" @click="primary">
      <div class="m_label">
        <span style="flex:1;margin-left:10px;">初级模式</span>
        <div class="m_rlink">></div>
      </div>
    </div>

    <!-- 简单模式 -->
    <div class="mark" :class="{disableClick:!isSimple}" @click="simple">
      <div class="m_label">
        <span style="flex:1;margin-left:10px;">简单模式</span>
        <div class="m_rlink" v-if="isSimple">></div>
        <div class="m_rlink" v-if="!isSimple">
          <van-icon name="lock" />
        </div>
      </div>
    </div>

    <!-- 困难模式 -->
    <div class="mark" :class="{disableClick:!isDifficult}" @click="difficult">
      <div class="m_label">
        <span style="flex:1;margin-left:10px;">困难模式</span>

        <div class="m_rlink" v-if="isDifficult">></div>

        <div class="m_rlink" v-if="!isDifficult">
          <van-icon name="lock" />
        </div>
      </div>
    </div>

    <!-- 进阶模式 -->
    <div class="mark" :class="{disableClick:!isAdvance}" @click="advance">
      <div class="m_label">
        <span style="flex:1;margin-left:10px;">进阶模式</span>

        <div class="m_rlink" v-if="isAdvance">></div>

        <div class="m_rlink" v-if="!isAdvance">
          <van-icon name="lock" />
        </div>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import nHeader from "../components/Header";
import tabbar from "../components/TabBar";
export default {
  name: "exam",
  data() {
    return {
      isLock: false,
      isSimple: false, // 判断简单模式是否可用
      isDifficult: false, // 判断困难模式是否可用
      isAdvance: false, // 判断进阶模式是否可用
      isLogin: false,
      sumScore: 0
    };
  },
  components: {
    tabbar,
    nHeader
  },
  created() {
    if (localStorage.eleToken) {
      this.isLogin = true;
      this.$axios
        .get(
          "http://localhost:2728/api/user/userInfo/" +
            this.$store.getters.user.id
        )
        .then(res => {
          this.sumScore =
            res.data.primaryScore +
            res.data.simpleScore +
            res.data.difficultScore +
            res.data.advanceScore;

          if (this.sumScore > 50) {
            this.isSimple = true;
          }
          if (this.sumScore > 160) {
            this.isDifficult = true;
          }
          if (this.sumScore > 270) {
            this.isAdvance = true;
          }
        });
    }
  },
  methods: {
    rank() {
      if (this.isLogin) {
        this.$router.push("/rank");
      } else {
        this.$router.push("/login");
      }
    },
    error() {
      if (this.isLogin) {
        this.$router.push("/errorQuestion");
      } else {
        this.$router.push("/login");
      }
    },
    primary() {
      if (this.isLogin) {
        this.$router.push({
          name: "question",
          params: { situation: "primary" }
        });
      } else {
        this.$router.push("/login");
      }
    },
    simple() {
      if (this.isLogin) {
        this.$router.push({
          name: "question",
          params: { situation: "simple" }
        });
      } else {
        this.$router.push("/login");
      }
    },
    difficult() {
      if (this.isLogin) {
        this.$router.push({
          name: "question",
          params: { situation: "difficult" }
        });
      } else {
        this.$router.push("/login");
      }
    },
    advance() {
      if (this.isLogin) {
        this.$router.push({
          name: "question",
          params: { situation: "advance" }
        });
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
@import "../font/rank/rank.css";
@import "../font/wrong/wrong.css";
.badge {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}
.errorTest {
  margin-left: 100px;
}
.text {
  font-size: 15px;
  color: #585858;
}
.mark {
  width: 100%;
  height: 40px;
  margin-top: 5px;
  border-bottom: 1px solid #ddd9d9;
  font-size: 14px;
  line-height: 40px;
  color: #7d7e80;
}
.m_label {
  display: flex;
  align-items: center;
}
.m_rlink {
  margin-right: 10px;
}
.disableClick {
  pointer-events: none;
}
</style>