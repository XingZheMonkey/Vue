<template>
  <div class="divInput" ref="option">
    <div class="input" @click="openValue" :class="{ disableSelect: disabled }">
      <input :value="key" type="text" :placeholder="placeholder" readonly />
      <svg-icon class="arro" iconClass="dropdown"></svg-icon>
    </div>

    <div class="list" v-show="show">
      <ul>
        <li
          v-for="item in optionsData"
          :key="item.value"
          @click="getvalue(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    optionsData: Array,
    placeholder: String,
    role: String,
    disabled: Boolean,
  },
  data() {
    return {
      show: false,
      key: this.role,
    };
  },
  methods: {
    openValue() {
      this.show = !this.show;
    },
    getvalue(item) {
      this.$emit("chooseOption", item);
      this.show = false;
      this.key = item;
    },
  },
  mounted() {
    let that = this;
    document.addEventListener("click", (e) => {
      if (that.$refs.option && that.$refs.option.contains(e.target)) {
        return;
      }
      that.show = false;
    });
  },
};
</script>

<style lang="less" scoped>
@import "@/common/color.less";
.input {
  position: relative;
  width: 140px;

  .arro {
    position: absolute;
    top: 50%;
    transform: translate(-150%, -50%);
  }
  input {
    width: 140px;
    height: 40px;
    outline: none;
    border-radius: 4px;
    background-color: transparent;
    user-select: none;
    color: transparent;
    padding-left: 10px;
    cursor: pointer;
  }
}
.list {
  width: 140px;
  border: 1px solid #cccccc;
  overflow: hidden;
  position: absolute;

  z-index: 10;
}
.list ul li {
  width: 100%;
  height: 40px;
  cursor: pointer;
  line-height: 40px;
  padding-left: 10px;
}

.whiteTheme {
  input {
    border: 1px solid #cccccc;
    text-shadow: 0 0 black;
    &:focus {
      border-color: @white-highlight;
    }
    &::-webkit-input-placeholder {
      color: #c0c4cc;
    }
  }
  .list {
    background-color: white;
    ul li:hover {
      background-color: @white-hover;
    }
  }

  .disableSelect {
    pointer-events: none;
    background: rgba(0, 0, 0, 0.02);
  }
}

.blackTheme {
  input {
    border: 1px solid @black-border-color;
    text-shadow: 0 0 white;
    &:focus {
      border-color: #fff;
    }
    &::-webkit-input-placeholder {
      color: #c0c4cc;
    }
  }
  .list {
    background-color: @black-background;
    ul li:hover {
      background-color: @black-hover;
    }
  }

  .disableSelect {
    pointer-events: none;
    background: rgba(255, 255, 255, 0.08);
}
}
</style>