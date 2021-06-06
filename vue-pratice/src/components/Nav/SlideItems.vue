<template>
  <li :class="{ activeItem: active == slideItems.path && !isFolder }">
    <router-link tag="span" :to="!isFolder ? slideItems.path : ''">
      <div
        class="sildeTitle"
        @click="openFolder"
        :style="{ paddingLeft: slideItems.index * 16 + 'px' }"
      >
        {{ $t(slideItems.meta.title) }}
        
        <span class="icon-arrow">
          <svg-icon v-if="isFolder" v-show="!isOpen" iconClass="arrowBottom"></svg-icon>
          <svg-icon v-if="isFolder" v-show="isOpen" iconClass="arrowTop"></svg-icon>
        </span>
      </div>
    </router-link>
    <transition name="fade">
      <ul class="slideGroup" v-show="isOpen" v-if="isFolder">
        <!-- *** 注意：父级传递的内容要在此处再次声明，以便向下传递   （@changeActive="change($event)"）（:active="active"）-->
        <item
          class="slideItem"
          v-for="slideItem in slideItems.children"
          :active="active"
          :slideItems="slideItem"
          :key="slideItem.title"
          @changeActive="change($event)"
        >
        </item>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  name: "Item",
  inject: ["change"],
  props: {
    slideItems: {
      type: Object,
      required: true,
    },
    active: {
      type: String,
    },
    change: {
      type: Function,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isFolder() {
      return this.slideItems.children && this.slideItems.children.length;
    },
  },
  methods: {
    openFolder() {
      this.isOpen = !this.isOpen;

      if (this.slideItems.path) {
        // 检查是否没有子级菜单，有子级菜单的不需高亮，不做active变更
        if (!this.slideItems.children) {
          // 由父级去改变 当前选中项的索引，以便所有子级都能使用其判断类名，如果在子级中改变会引起多个item高亮显示
          this.$emit("changeActive", this.slideItems.path);
        }
      }
    },
  },
  created() {
    // 如果当前项拥有子项，判断子项是否被选中，如果被选中，默认打开当前菜单
    if (this.slideItems.children) {
      this.isOpen = this.slideItems.children.some((item) => {
        return item.path == this.active;
      });
    }
  },
};
</script>

<style scoped lang="less">
@import "@/common/color.less";
.slideBar {
  .sildeTitle {
    padding: 10px 16px 10px 0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
}

.blackTheme .slideBar {
  .sildeTitle:hover {
    background: @black-hover;
  }
  .activeItem {
    color: @black-highlight;
  }
  .activeItem .sildeTitle:hover {
    color: @black-highlight;
  }
}

.whiteTheme .slideBar {
  .sildeTitle:hover {
    background-color: @white-hover;
  }
  .activeItem {
    color: @white-highlight;
  }
  .activeItem .sildeTitle:hover {
    color: @white-highlight;
  }
}

// 进入前，离开后
.fade-enter,
.fade-leave-to {
  height: 0;
  opacity: 0;
}
// 离开前，进入后
// .fade-leave,
// .fade-enter-to {
//   transform: translate3d(0, 0, 0);
// }
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
</style>