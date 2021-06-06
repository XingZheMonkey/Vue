<template>
  <div class="index">
    <input type="text" v-model="test" />
    <cv-inline-loading
      :active="active"
      :loading-text="loadingText"
      :loaded-text="loadedText"
    >
    </cv-inline-loading>

    <child
      :parentData="msg"
      @passData="requireData($event)"
      @bindtwo="two"
      :bindattr="this.attr"
    />
    <p>{{ getData }}</p>
  </div>
</template>
<script>
import child from "./child";
export default {
  name: "index",
  data() {
    return {
      loadingText: "Loading data...",
      loadedText: "Data loaded.",
      test: "",
      msg: "我是父级中的数据",
      getData: "",
      attr: "父级向三级组件传递de数据",
    };
  },
  computed: {
    active() {
      if (this.test) {
        return true;
      } else return false;
    },
  },
  provide(){
      return{
        pig:this.msg
      }
  },
  components: {
    child,
  },
  methods: {
    requireData(arg) {
      this.getData = arg;
    },
    two() {
      console.log("two");
    },
  },

  mounted(){
    // 查看路由元信息  
      console.log(this.$route.meta)
  }
};
</script>

