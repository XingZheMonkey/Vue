<template>
    <div>
        <div v-for="item in list" :key="item.id">
            {{item.title}}

            <button @click = "deleteItem(item.id)">删除</button>
        </div>

        
    </div>
</template>

<script>
import event from "./event"
export default {
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        deleteItem(id){
            this.$emit("delete",id)
        },
        addBortherHandler(title){
            console.log("兄弟之间通信--",title)
        }
        
    },
    mounted(){
        // 在同一个vue实例上挂载一个自定义一个事件，this.addBortherHandler是调用的实际事件
        event.$on("addBorther",this.addBortherHandler)
    },
    beforeDestory(){
        // 在组件销毁前及时解绑，否则可能造成内存泄漏
        event.$off("addBorther",this.addBortherHandler)
    }
}
</script>

<style scoped>

</style>