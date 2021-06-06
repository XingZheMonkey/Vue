<template>
  <div class="three">
    <h2>三级组件</h2>
    <p>{{ test }}</p>
  </div>
</template>

<script>
export default {
  name: "three",
  data() {
    return {
      test: this.$attrs.bindattr,
    };
  },
  inject: ["pig"],
  created() {
    console.log("孙子组件打印 --- 通过provide传递的数据 : "+this.pig);

    console.log(this.$listeners)
    this.$listeners.binda()
  },
};
</script>

<style scoped>
.three {
  width: 800px;
  height: 400px;
  background: blueviolet;
}
</style>

