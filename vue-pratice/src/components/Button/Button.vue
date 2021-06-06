<template>
  <button :style="{ background: backgroundColor, color: color }" @click="$emit('click')">
    <slot></slot>
  </button>
</template>


<script>
export default {
  props: {
    backgroundColor: {
      type: String,
    },
    color: {
      type: String,
    }
  },
};
</script>

<style scoped lang="less">
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    opacity: 0.8;
  }
}
</style>