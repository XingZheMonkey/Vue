<template>
  <div>
    全选 <input type="checkbox" v-model="checkAll" />

    <input
      type="checkbox"
      v-for="(item, index) in checks"
      v-model="item.value"
      :key="index"
    />

    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="[index == currentIndex ? 'high' : '']"
        @click="changeIndex(index)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  data() {
    return {
      checks: [{ value: true }, { value: true }, { value: false }],
      list: ["monkey", "king", "bajie"],
      currentIndex: 0,
    };
  },
  computed: {
    checkAll: {
      get() {
        return this.checks.every((check) => check.value);
      },
      set(value) {
        // 双向数据绑定使用 set 方法
        this.checks.forEach((item) => {
          item.value = value;
        });
      },
    },
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.high {
  color: aquamarine;
}
</style>