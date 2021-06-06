<template>
  <li ref="dropdown" @click="showDropdown" class="menuItem">
    <slot></slot>

    <svg-icon iconClass="dropdown"></svg-icon>

    <ul v-show="dropdownShow" class="dropdown">
      <li
        v-for="item in listItem"
        :key="item.key"
        @click="changeValue(item.value)"
      >
        {{ item.name }}
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    listItem: {
      type: Array,
      require: true,
    },
    list: {
      type: String,
    },
  },
  data() {
    return {
      dropdownShow: false,
    };
  },
  methods: {
    showDropdown() {
      this.dropdownShow = !this.dropdownShow;
    },
    changeValue(value) {
      this.$emit("changeValue", value);
    },
  },
  mounted() {
    let that = this;
    document.addEventListener("click", (e) => {
      if (that.$refs.dropdown && that.$refs.dropdown.contains(e.target)) {
        return;
      }
      that.dropdownShow = false;
    });
  },
};
</script>

<style scoped lang="less">
@import "@/common/color.less";
.menuItem {
  margin-left: 26px;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  span {
    margin-right: 8px;
  }
  .dropdown {
    position: absolute;
    background: @black-background;
    left: -10px;
    top: 50px;
    white-space: nowrap;
    border: 1px solid @black-border-color;
    li {
      padding: 10px 20px;
      border-bottom: 1px solid @black-border-color;
    }
    li:hover {
      color: @black-highlight;
      background: @black-hover;
    }
  }
}

.whiteTheme .dropdown {
  background: @white-background;
  border: 1px solid @white-border-color;
  li:hover {
    color: @white-highlight;
    background: @white-hover;
  }
}
</style>