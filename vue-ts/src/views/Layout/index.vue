<template>
  <div class="layout">
    <LayoutHeader></LayoutHeader>
    <LayoutContainer>
      <Sidebar slot="left"></Sidebar>
      <router-view slot="content"></router-view>
    </LayoutContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutContainer from "./LayoutContainer.vue";
import Sidebar from "./Sidebar.vue";
@Component({
  components: {
    LayoutHeader,
    LayoutContainer,
    Sidebar
  }
})
export default class Layout extends Vue {}
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>