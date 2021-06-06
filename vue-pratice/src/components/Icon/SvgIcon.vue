<template>
  <svg :class="svgClass" v-on="$listeners" :fill="fillColor">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    iconClass: { type: String, required: true },
    className: {
      type: String,
    },
    fillColor:{
      type:String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon" + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style scoped lang="less">
.svg-icon {
  width: 16px;
  height: 16px;
}
</style>