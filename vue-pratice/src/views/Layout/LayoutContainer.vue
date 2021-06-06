<template>
  <div class="container">
    <!-- 侧边栏 -->
    <aside>
      <slot name="sliderBar"></slot>
    </aside>

    <!-- 主区域 -->
    <main>
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <slot name="breadcrumb"></slot>
      </div>

      <!-- 内容区域 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "@/common/color.less";
.container {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  aside {
    height: 100%;
  }
  main {
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(82, 82, 82, 0.3);
    }

    &::-webkit-scrollbar-track {
        border-radius: 0;
        background: #f5f5f5;
    }
  }
  .breadcrumb {
    padding: 10px 24px;
    width: 100%;
    background: @black-light-color;
    border-bottom: 1px solid @black-border-color;
  }
  .content {
    min-height: calc(100% - 42.81px);
  }
}

.whiteTheme .breadcrumb{
    background: @white-background;
    border-bottom: 1px solid @white-border-color;
}

.blackTheme .content{
    background: @black-background;
    color: @white-background;
}
</style>