<template>
  <div class="question">
    <!-- 头部 -->
    <nHeader style="background:#fafafa;" title="分类测试" :sum="sum" :length="length">
      <div slot="back">&lt;</div>
    </nHeader>

    <div class="content">
      <div v-if="!finished" style="overflow:hidden;">
        <!-- 题目数 -->
        <div class="number">{{sum+1 | formatNumber}}/10</div>

        <!-- 遍历问题 -->
        <div
          class="ques"
          v-for="(ques,quesIndex) in question"
          v-if="currentQuestion===quesIndex"
          :key="quesIndex"
        >
          {{ques.question}}
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

      <!-- 答题完成后显示的内容 -->
      <div v-if="finished">
        <div class="popupTitle">成绩单</div>

        <!-- 表格 -->
        <div class="ul">
          <table>
            <tr style="background:#f5f7f9;color:#657180;">
              <td>问题</td>
              <td>正确答案</td>
            </tr>
            <tr v-for="res in finishedQuestion">
              <td>{{res.question}}</td>
              <td :class="{right:res.result}">{{res.type}}</td>
            </tr>
          </table>

          <div class="tag">
            <div>
              <span class="one"></span>
              <span>回答正确</span>
            </div>
            <div>
              <span class="two"></span>
              <span style="margin-left:10px;">回答错误</span>
            </div>
          </div>
        </div>
        <!-- 表格结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import nHeader from "../components/Header";
export default {
  data() {
    return {
      category: ["干垃圾", "湿垃圾", "可回收垃圾", "有害垃圾"],
      question: [], // 所有问题
      currentQuestion: 0, // 当前问题的索引
      sum: 0, // 当前答题数量
      score: 0, // 当前得分
      finished: false, // 是否答完题
      length: 10,
      randomArr: [], // 打乱的数组，用于生成不重复的随机数
      finishedQuestion: [], // 存储回答过的所有问题
      situation: this.$route.params.situation, // 路由参数，用来判断问题难度
      errorQuestion: [], // 错题数组
      alreadyErrQues: [], // 数据库已存储的错题记录，便于与新的错题进行比较，避免出现冗余数据
      showDialog: false,
      sumScore: 0
    };
  },
  components: {
    nHeader
  },
  methods: {
    choose(index) {
      // 当前问题的正确答案对应的索引
      const correctIndex = this.question[this.currentQuestion].answer - 1;

      // 获取所有选项
      const options = this.$refs.option;

      if (index == correctIndex) {
        // 将正确答案标绿，分数+10
        options[correctIndex].style.backgroundColor = "#9deeb2";
        options[correctIndex].style.color = "#10642a";
        options[correctIndex].style.border = "none";

        // 存储此问题已答对
        this.question[this.currentQuestion].result = true;

        // 将成绩+10
        this.score += 10;
      } else {
        // 将正确答案标绿，错误答案标红
        options[index].style.backgroundColor = "#ffcfe1";
        options[index].style.color = "#a11950";
        options[index].style.border = "none";

        options[correctIndex].style.backgroundColor = "#9deeb2";
        options[correctIndex].style.color = "#10642a";
        options[correctIndex].style.border = "none";

        // 存储此问题已答错
        this.question[this.currentQuestion].result = false;

        // 将错题存储到错题数组中
        this.errorQuestion.push(this.question[this.currentQuestion]);
      }

      // 将回答过的问题存储到另一个数组中，以方便最后统计成绩
      this.finishedQuestion.push(this.question[this.currentQuestion]);

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

      // 答完10道题时进行的操作
      if (this.sum >= 9) {
        setTimeout(() => {
          this.finished = true; // 把状态设置为已完成

          // 将错题带上用户id存储到数据库中的错题表中

          let repeat = []; // 记录重复数据

          // 对比两个数组，取出重复值
          this.errorQuestion.forEach(item => {
            item.u_id = this.$store.getters.user.id;

            this.alreadyErrQues.forEach(al_item => {
              if (al_item.q_id == item._id) {
                repeat.push(item);
              }
            });
          });

          // 删除重复数据
          repeat.forEach(item => {
            this.errorQuestion.remove(item);
          });

          // 遍历删选出来的数据，添加到错题表中
          this.errorQuestion.forEach(item => {
            this.$axios
              .post("http://localhost:2728/api/exam/saveErrQues", item)
              .then(data => {})
              .catch(err => {
                console.log(err);
              });
          });

          // 更新单项积分
          this.$axios
            .post(
              `http://localhost:2728/api/user/${this.situation}/${this.$store.getters.user.id}`,
              {
                score: this.score
              }
            )
            .then(res => {
              // 计算总分
              this.$axios
                .get(
                  "http://localhost:2728/api/user/userInfo/" +
                    this.$store.getters.user.id
                )
                .then(data => {
                  this.user = data.data;

                  this.sumScore =
                    this.user.primaryScore +
                    this.user.simpleScore +
                    this.user.difficultScore +
                    this.user.advanceScore;

                  // 更新总分
                  this.$axios
                    .post(
                      `http://localhost:2728/api/user/sumScore/${this.$store.getters.user.id}`,
                      { sumScore: this.sumScore }
                    )
                    .then(isUpdate => {});
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }, 1500);
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
        this.alreadyErrQues = data.data;
      });

    // 获取所有问题
    this.$axios.get("http://localhost:2728/api/exam/question").then(res => {
      const tmpQuestion = res.data;

      // 通过路由参数过滤出当前等级的数据
      const newQuestion = tmpQuestion.filter((item, index) => {
        item.type = this.category[item.answer - 1];
        return item.situation == this.situation;
      });

      // 创建一个供随机数使用的数组
      for (let i = 0; i < newQuestion.length; i++) {
        this.randomArr.push(i);
      }
      // 将随机数的顺序打乱
      this.randomArr.sort(() => {
        return 0.5 - Math.random();
      });

      // 将打乱的随机数赋值给当前问题索引
      this.currentQuestion = this.randomArr[0];

      this.question = newQuestion;
    });
  },
  filters: {
    formatNumber(number) {
      if (number >= 10) {
        return number;
      } else {
        return "0" + number;
      }
    }
  }
};
</script>

<style scoped>
.back {
  float: left;
  font-size: 18px;
  color: #7d7e80;
  margin-left: 10px;
}
.title {
  display: inline-block;
}
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
.popupTitle {
  text-align: center;
  color: #7d7e80;
  margin-bottom: 20px;
}
.ul {
  margin-top: 10px;
}
table {
  border-collapse: collapse;
  border: 1px solid #dbdbdb;
}
tr > td {
  padding: 8px 10px;
  width: 30%;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid white;
}
td {
  background-color: #ffcfe1;
  color: #a11950;
}
td:nth-of-type(1) {
  border-bottom: 1px solid #dbdbdb;
  background: white;
  color: rgb(0, 0, 0);
}
tr:nth-of-type(1) td {
  color: #363636;
  border-bottom: 1px solid #dbdbdb;
  background: rgb(245, 247, 249);
}
.right {
  background: #9deeb2;
  color: #10642a;
}
.tag {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #7d7e80;
}
.one {
  display: inline-block;
  width: 20px;
  height: 10px;
  background: #9deeb2;
  margin-right: 10px;
}
.two {
  display: inline-block;
  width: 20px;
  height: 10px;
  background: #ffcfe1;
}
</style>