<template>
  <div :class="{ 'normal-tab': !isVertical, 'vertical-tab': isVertical }">
    <ul
      :class="{
        'normal-tab-group': !isVertical,
        'vertical-tab-group': isVertical,
      }"
    >
      <li
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        :class="{
          'tab-item': true,
          'active-tab': currentTab == tab,
          'vertical-tab-item': isVertical,
        }"
      >
        {{ tab }}
      </li>
    </ul>

    <component :is="currentComponent" class="tab-content"></component>
  </div>
</template>

<script>
import TabHtml from "@components/Tab/TabItems/Tab-html.vue";
import TabJs from "@components/Tab/TabItems/Tab-js.vue";
import TabCdn from "@components/Tab/TabItems/Tab-cdn.vue";
export default {
  name: "tab",
  props: {
    isVertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentTab: "js",
      tabs: ["js", "html", "cdn"],
    };
  },
  components: {
    TabHtml,
    TabJs,
    TabCdn,
  },
  computed: {
    currentComponent() {
      return "Tab-" + this.currentTab;
    },
  },
};
</script>

<style scoped lang = "less">
@import "@/common/color.less";
.common-tab {
  background: @white-background;
  border: 1px solid #dcdfe6;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04); */
}
.vertical-tab {
  .common-tab;
  display: flex;
  .vertical-tab-group {
    background-color: @white-light-color;
  }
}

.normal-tab {
  .common-tab;

  .normal-tab-group {
    display: flex;
    background-color: @white-light-color;
    border-bottom: 1px solid @white-border-color;
  }
}
.tab-item {
  padding: 20px;
  color: #909399;
  cursor: pointer;
  user-select: none;
}
.active-tab {
  color: @white-highlight;
  background: @white-background;
  border-right-color: @white-border-color;
  border-left-color: @white-border-color;
}
.tab-content {
  padding: 16px;
  width: 100%;
}

.blackTheme {
  .common-tab {
    background: @black-background;
  }
  .normal-tab {
    background: @black-background;
    border: 1px solid @black-border-color;
  }
  .vertical-tab-group {
    background-color: @black-background;
  }
  .normal-tab-group {
    background-color: @black-background;
    border: 1px solid @black-border-color;
  }
  .tab-item {
    color: @black-font-color
  }
  .active-tab {
    color: @black-highlight;
    background-color: @black-light-color;
  }
}
</style>