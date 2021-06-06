<template>
  <div
    :class="[
      theme == 'blackTheme' ? 'blackTheme' : 'whiteTheme',
      'layout',
    ]"
  >
    <layout-header :theme="theme" />

    <LayoutContainer>
      <template v-slot:sliderBar>
        <layout-slider :theme="theme" />
      </template>

      <!-- 面包屑 -->
      <template v-slot:breadcrumb>
        <div>
          <router-link
            tag="span"
            v-for="item in matchedArr"
            :key="item.path"
            :to="item.path"
            :class="[ item.isLast ? 'disableClick' : 'ableClick']"
          >
            {{ $t(item.name) }}
            <span class="separator">{{ item.isLast ? "" : ">" }}</span>
          </router-link>
        </div>
      </template>

      <template v-slot:content>
        <!-- 对需要缓存的路由页面进行缓存 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- 不需要缓存的路由页面不需要使用 keep-alive -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </template>
    </LayoutContainer>
  </div>
</template>

<script>
import LayoutHeader from "./LayoutHeader";
import LayoutSlider from "./LayoutSlider";
import LayoutContainer from "./LayoutContainer";
export default {
  components: {
    LayoutHeader,
    LayoutSlider,
    LayoutContainer,
  },
  computed: {
    matchedArr() {
      let temp = [{ name: 'leftNav.home', path: "/" }];
      this.$route.matched.forEach((item) => {
        if (item.meta.title && item.path && item.path != "/home") {
          temp.push({ name: item.meta.title, path: item.path });
        }
      });
      temp[temp.length - 1].isLast = true;
      return temp;
    },
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/common/color.less";
.layout {
  width: 100%;
  height: 100%;
}

.blackTheme {
  .ableClick {
    color: @black-font-color;
    cursor: pointer;
  }
  .ableClick:hover {
    color: @black-highlight;
  }
  .disableClick {
    pointer-events: none;
    color:@black-font-color;
  }
  .separator {
    color: @black-font-color;
  }
}
.whiteTheme {
  .ableClick:hover {
    color: @white-highlight;
    cursor: pointer;
  }
  .disableClick {
    pointer-events: none;
  }
  .separator {
    color: @white-font-color;
  }
}
</style>