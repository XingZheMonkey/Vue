<template>
  <div class="slideBar">
    <ul v-for="slideItem in treeData" :key="slideItem.title">
      <SildeItems
        :active="activeIndex"
        :slideItems="slideItem"
        @changeActive="change($event)"
      ></SildeItems>
    </ul>
  </div>
</template>

<script>
import SildeItems from "./SlideItems.vue";
export default {
  components: {
    SildeItems,
  },
  props: {
    theme: {
      type: String,
      default: "blackTheme",
    },
  },
  // 由于递归组件，故使用provide传递数据和方法以方便每一级都能拿到
  provide() {
    return {
      change: this.change,
    };
  },
  data() {
    return {
      activeIndex: "",
      treeData: [],
    };
  },
  watch: {
    // 监听路由变化，改变路径值时，页面没有重新渲染，activeIndex不会重新获取
    $route() {
      this.activeIndex = this.$router.currentRoute.path;
    },
  },
  methods: {
    change(arg) {
      this.activeIndex = arg;
    },
    setIndex(data, flag) {
      flag = Number(flag);

      // 赋值层级,用来判断是第几层目录，用来设置 padding
      data.index = flag;


      if (data.children && data.children.length) {
        // 往下递归增加层级
        flag++;

        // 递归 children
        data.children.forEach((item) => {
          this.setIndex(item, flag);
        });
      }
    },
    filterData(data) {
      let accessData = data.filter((item) => {
        if (item.inMenu && item.meta && item.meta.title) {
          if (item.children && item.children.length) {
            item.children = this.filterData(item.children);
          }
          return true;
        }
        return false;
      });
      return accessData;
    },
  },
  created() {
    let routesList = this.$store.state.routesList;

    // 1.首先遍历出需要显示的项
    this.treeData = this.filterData(routesList);

    // 2. 为筛选出的列表设置层级
    this.treeData.forEach(item => {
      this.setIndex(item, 1);

      // 3. 重新设置 模板路由的path，以便于进行高亮匹配，把 path 替换为redirect
      if(item.redirect){
        item.path = item.redirect
      }
    });

    // 获取当前路由页面，并使其为高亮项
    this.activeIndex = this.$router.currentRoute.path;
  },
};
</script>

<style lang="less" scoped>
@import "@/common/color.less";
.slideBar {
  width: 200px;
  padding-top: 20px;
  height: 100%;
  user-select: none;
}
.blackTheme .slideBar {
  border-right: 1px solid @black-border-color;
  background: @black-background;
  color: @black-font-color;
}
.whiteTheme .slideBar {
  border-right: 1px solid @white-border-color;
  color: @white-font-color;
}
</style>
