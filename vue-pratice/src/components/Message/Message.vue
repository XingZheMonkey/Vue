<template>
  <div
    :class="[
      'my-message',
      `my-message-${type}`
    ]"
    v-if="isShow"
  >
    <svg-icon :iconClass="type"></svg-icon>
    <div class="content">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      require:true
    },
    duration: {
      type: Number,
      require:true
    },
    type:{
        type:String
    }
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    },
  },
};
</script>

<style lang="less" scoped>
.my-message {
  min-width: 380px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #edf2fc;
  padding: 15px 15px 15px 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  .content{
    margin-left: 8px;
  }
}

.my-message-success{
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67C23A;
}
.my-message-fail{
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #F56C6C
}

.my-message-warn{
    background-color: #fdf6ec;
    border-color: #faecd8;
    color:#e6a23c;
}


</style>