<template>
<button @click="alert">alert</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Message } from "@plugins/message";
export default defineComponent({
  name: 'App',
  setup(){
    const alert = ()=>{
      Message({
        type:'success',
        center:true,
        message:'test'
      })
    }
    return {
      alert
    }
  }
})
</script>

<style>
</style>
