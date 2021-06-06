<template>
  <div class="detail-modal">
    <div class="detail-content">
      <span class="detail-close" @click="close"> X </span>
      <div class="detail-content-info">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.remove();
    },
  },
};
</script>


<style scoped>
.detail-modal {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 24px;
    z-index: 999999;
    -ms-touch-action: none;
    touch-action: none;
}
/* 纯文字弹窗样式 */
.detail-modal .detail-content {
  background-color: white;
  border-radius: 8px;
  position: relative;
  padding: 104px 16px 80px 80px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-height: 450px;
}

.detail-modal .detail-content-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 266px;
  overflow-y: auto;
}

.detail-modal .detail-close {
  position: absolute;
  top: 21px;
  right: 21px;
  color: #9a9a9a;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.detail-modal .detail-content-info_title {
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 16px;
  color: #000000;
}

.detail-modal .detail-content-info_text {
  font-size: 16px;
  line-height: 25px;
  color: #7f7f7f;
  overflow-y: auto;
  padding-right: 64px;
  word-break: break-all;
}

.detail-modal .detail-content-info_text::-webkit-scrollbar {
  width: 8px;
}

.detail-modal .detail-content-info_text::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(82, 82, 82, 0.3);
}

.detail-modal .detail-content-info_text::-webkit-scrollbar-track {
  border-radius: 0;
  background: #f5f5f5;
}

@media screen and (max-width: 991.98px) {
  .detail-modal .detail-content {
    height: auto;
  }

  .detail-modal .detail-content-info {
    /* 视窗高度 - 两个导航条 - 上下padding */
    max-height: calc(100vh - 248px);
  }

  .detail-modal .detail-content-info_text::-webkit-scrollbar {
    width: 4px;
  }
}

@media screen and (max-width: 991.98px) and (min-width: 601px) {
  .detail-modal .detail-content {
    padding: 64px 16px 64px 80px;
  }
}

@media screen and (max-width: 600px) {
  .detail-modal .detail-content {
    padding: 64px 16px 64px 32px;
  }

  .detail-modal .detail-content-info_text {
    padding-right: 16px;
  }
}
</style>
