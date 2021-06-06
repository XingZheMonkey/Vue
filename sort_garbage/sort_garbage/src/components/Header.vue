<template>
  <div class="navHead">
    <div class="back" @click="back">
      <slot name="back"></slot>
    </div>
    <div class="title">{{title}}</div>

    <van-dialog v-model="showDialog" show-cancel-button :beforeClose="chargeBtn">
      <div class="message">您尚未完成答题，此时离开将不会保留成绩，是否确认离开</div>
    </van-dialog>
  </div>
</template>
<script>
export default {
  name: "navHead",
  data() {
    return {
      showDialog: false
    };
  },
  props: {
    title: {
      type: String
    },
    sum: {
      type: Number
    },
    length:{
      type:Number
    }
  },
  methods: {
    back() {
      if (this.sum > 0 && this.sum < this.length) {
        this.showDialog = true;
      } else {
        this.$router.go(-1);
      }
    },
    chargeBtn(action, done) {
      if (action === "cancel") {
        done();
      } else if (action === "confirm") {
        this.showDialog = false;
        this.$router.go(-1);
      }
      done();
    }
  }
};
</script>
<style scoped>
.navHead {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: white;
}
.back {
  float: left;
  font-size: 18px;
  color: #7d7e80;
  margin-left: 10px;
}
.title {
  display: inline-block;
}
.message {
  padding: 24px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 20px;
  color: #7d7e80;
}
</style>