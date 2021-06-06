<template>
  <div id="app">
    <ComputedApply></ComputedApply>
    <Tree></Tree>
    <Popup></Popup>
  </div>
</template>

<script>
import ComputedApply from "./view/computed"
import Tree from "./view/tree"
import Popup from "./view/popup"
export default {
  name: 'App',
  components:{
    ComputedApply,
    Tree,
    Popup
  }
}
</script>

<style>
</style>
