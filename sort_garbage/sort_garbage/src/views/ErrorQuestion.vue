<template>
  <div class="question">
    <!-- 头部 -->
    <nHeader style="background:#fafafa;" title="错题记录" :sum="sum" :length="length">
      <div slot="back">&lt;</div>
    </nHeader>

    <div class="content">
      <div v-if="!finished" style="overflow:hidden;">
        <div v-if="!errorQuestion.length" class="tip">
          <van-icon name="thumb-circle-o" size="40px" color="rgb(38, 230, 88)" />
          <span>恭喜您，您并未答错任何问题</span>
        </div>

        <div v-else>
          <!-- 题目数 -->
          <div class="number">{{sum+1 | formatNumber}}/{{errorQuestion.length | formatNumber}}</div>

          <!-- 遍历问题 -->
          <div
            class="ques"
            v-for="(ques,quesIndex) in errorQuestion"
            v-if="currentQuestion===quesIndex"
            :key="quesIndex"
          >
            {{ques.errorQuestion}}
            <!-- 遍历选项 -->
            <div
              class="answer"
              v-for="(item,index) in category"
              :key="index"
              @click="choose(index)"
              ref="option"
            >{{item}}</div>
          </div>
          <!-- 遍历结束 -->
        </div>
      </div>

      <!-- 答题完成后显示的内容 -->
      <van-dialog v-model="finished" :beforeClose="confirm">
        <div class="message">您已回答完所有问题，点击确定返回上级目录</div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import nHeader from "../components/Header";
export default {
  data() {
    return {
      category: ["干垃圾", "湿垃圾", "可回收垃圾", "有害垃圾"],
      errorQuestion: [], // 所有错题
      currentQuestion: 0, // 当前问题的索引
      sum: 0, // 当前答题数量
      length: 0, // 题目总数
      finished: false, // 是否答完题
      randomArr: []
    };
  },
  components: {
    nHeader
  },
  methods: {
    confirm() {
      this.$router.go(-1);
    },
    choose(index) {
      // 当前问题的正确答案对应的索引
      const correctIndex = this.errorQuestion[this.currentQuestion].answer - 1;

      // 获取所有选项
      const options = this.$refs.option;

      if (index == correctIndex) {
        // 将正确答案标绿，分数+10
        options[correctIndex].style.backgroundColor = "#9deeb2";
        options[correctIndex].style.color = "#10642a";
        options[correctIndex].style.border = "none";

        // 存储此问题已答对
        this.errorQuestion[this.currentQuestion].result = true;
      } else {
        // 将正确答案标绿，错误答案标红
        options[index].style.backgroundColor = "#ffcfe1";
        options[index].style.color = "#a11950";
        options[index].style.border = "none";

        options[correctIndex].style.backgroundColor = "#9deeb2";
        options[correctIndex].style.color = "#10642a";
        options[correctIndex].style.border = "none";
      }

      // 进行选择后关闭点击事件，不允许更改
      options.forEach(item => {
        item.style.pointerEvents = "none";
      });

      // 间隔1.5秒后切换到下一题
      setTimeout(() => {
        // sum自增，进行到下一题
        this.sum++;
        this.currentQuestion = this.randomArr[this.sum];
      }, 1500);

      // 答完所有道题时进行的操作
      if (this.sum >= this.errorQuestion.length - 1) {
        setTimeout(() => {
          this.finished = true; // 把状态设置为已完成
        }, 1500);
      }
    }
  },
  filters: {
    formatNumber(number) {
      if (number >= 10) {
        return number;
      } else {
        return "0" + number;
      }
    }
  },
  created() {
    // 获取已有错题
    this.$axios
      .get(
        `http://localhost:2728/api/exam/errQues/${this.$store.getters.user.id}`
      )
      .then(data => {
        this.errorQuestion = data.data;

        this.length = this.errorQuestion.length;

        // 创建一个供随机数使用的数组
        for (let i = 0; i < this.errorQuestion.length; i++) {
          this.randomArr.push(i);
        }
        // 将随机数的顺序打乱
        this.randomArr.sort(() => {
          return 0.5 - Math.random();
        });

        // 将打乱的随机数赋值给当前问题索引
        this.currentQuestion = this.randomArr[0];

      });
  }
};
</script>

<style scoped>
.question {
  height: 100%;
  overflow: hidden;
}
.content {
  padding: 30px;
  height: 100%;
  text-align: center;
  background: white;
}
.ques {
  font-size: 18px;
  margin-top: 50px;
}
.answer {
  width: 40%;
  border: 1px solid #c5bfbf;
  margin: 0 auto;
  padding: 6px;
  border-radius: 50px;
  font-size: 14px;
  margin-top: 20px;
}
.number {
  float: left;
  color: #7d7e80;
}
.message {
  padding: 24px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 20px;
  color: #7d7e80;
}
.tip {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
}
</style>