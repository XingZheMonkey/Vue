<template>
  <div>
    <ul>
      <Item class="item" :model="treeData"></Item>
    </ul>
  </div>
</template>

<script>
import Item from "../components/Item";
export default {
  name:"tree",
  components: {
    Item,
  },
  data() {
    return {
      treeData: {
        title: "web全栈",
        children: [
          {
            title: "java",
          },
          {
            title: "js高级",
            children: [{ title: "css" }],
          },
          {
            title:"html"
          }
        ],
      },
    };
  },
};
</script>