<template>
  <Child :count="count" @updateCount="update" ref="childRef"/>

  <div class="color">测试 v-bind 绑定颜色</div>

  <button @click="changeColor">改变颜色试试</button>

</template>

<script setup>
import Child from "./child.vue";
import { ref } from "vue";
ref: count = 0;

const update = () => {
  count++;
};

/**
 * v-bind 声明 css 变量
 */

ref: color1 = "red";

const colorArr = ["red", "green", "aquamarine", "aquam"];
function changeColor() {
  const index = Math.floor(Math.random() * colorArr.length);
  color1 = colorArr[index];
}

/**
 * 获取元素，检查expose作用
 */

const childRef = ref(null)
</script>

<style lang="less">
    .color{
        color: v-bind(color1);
    }
</style>