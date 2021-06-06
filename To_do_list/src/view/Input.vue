<template>
    <div>
        <input type="text" v-model.lazy="title">
        <button @click="addItem">添加</button>
    </div>
</template>

<script>
import event from "./event"
export default {
    data(){
        return {
            title:""
        }
    },
    methods:{
        addItem(){
            this.$emit("add",this.title)

            // 调用其他组件上 挂载在同一个vue实例上的自定义事件
            event.$emit("addBorther",this.title)
        }
    }
}
</script>
<style>

</style>