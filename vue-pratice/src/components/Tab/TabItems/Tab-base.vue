<template>
  <div class="sub-tab">
    <ul>
      <li
        v-for="(item, key) in subTabItem"
        :key="key"
        :class="{
          'subTab-item': true,
          'active-subTab': currentTab == item.index,
        }"
        @click="currentTab = item.index"
      >
        {{ key }}
      </li>
    </ul>

    <!-- v-for 结合 v-show 控制显示隐藏 -->
    <!-- <div
      class="subTab-detail"
      v-for="item in subTabItem"
      :key="item.index"
      v-show="currentTab == item.index"
    >
      {{ item.content }}
    </div> -->
    <!-- 用 计算属性代替 v-for 与 v-if 结合的场景 -->
    <div class="subTab-detail">
      {{ activeSubDetail.content }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Tab-base",
  data() {
    return {
      currentTab: 0,
      subTabItem: {
        按需加载: {
          content:
            "惊艳得外形，惊人得实力，集各种旗舰基因于一身，满足你非凡品味，更满足你对性能的 严苛追求。",
          index: 0,
        },

        函数缓存: {
          content: `解决同参数的函数反复执行，给定返回值，用内存换取性能`,
          index: 1,
        },
        惰性载入函数: {
          content: "华为P40",
          index: 2,
        },
        函数柯里化: {
          content: "华为P40",
          index: 3,
        },
        函数防抖: {
          content: "华为P40",
          index: 4,
        },
        函数节流: {
          content: "华为P40",
          index: 5,
        },
        CDN: {
          content: "华为P40",
          index: 6,
        },
        Cookie: {
          content: "华为P40",
          index: 7,
        },
      },
    };
  },
  computed: {
    activeSubDetail() {
      let activeSub;
      for (let key in this.subTabItem) {
        if (this.subTabItem[key].index == this.currentTab) {
          activeSub = this.subTabItem[key];
        }
      }
      return activeSub;
    },
  },
};
</script>

<style lang="less" scoped>
.sub-tab {
  display: flex;
  .subTab-item {
    padding: 20px;
    cursor: pointer;
    border-right: 2px solid #e4e7ed;
  }
  .active-subTab {
    color: #409eff;
    background: #fff;
    border-right-color: #409eff;
  }
  .subTab-detail {
    padding: 16px;
  }
}

.blackTheme .sub-tab {
  .active-subTab {
    color: #ffd04b;
    background: #393939;
    border-right-color: #ffd04b;
  }
}
</style>