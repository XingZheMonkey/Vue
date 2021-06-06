<template>
  <!-- 通过递归实现树结构 -->
  <li>
    <div @click="toggle">
      {{ model.title }}
      <span v-if="isFolder">[{{ open ? "-" : "+" }}]</span>
    </div>
    
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="model in model.children"
        :model="model"
        :key="model.title"
      ></item>
    </ul>
  </li>
</template>  

<script>
export default {
  name: "Item",
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    },
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
</style>