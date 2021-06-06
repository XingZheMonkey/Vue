<template>
  <SliderBar :theme="theme"></SliderBar>
</template>

<script>
import SliderBar from "@components/Nav/SlideBar";
export default {
  components: {
    SliderBar,
  },
  props:{
    theme:{
      type:String,
      require:true
    }
  }
};
</script>