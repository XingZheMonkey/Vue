<template>
    <div>
        <Input @add="addHandler"/>
        <List :list="list" @delete="deleteHandler"></List>
    </div>
</template>

<script>
import List from "./List"
import Input from "./Input"
export default {
    components:{
        Input,
        List
    },
    data(){
        return {
            list:[
                {id:"id-1",title:"first"},
                {id:"id-2",title:"second"}
            ]
        }
    },
    methods:{
        addHandler(title){
            this.list.push({
                id:`id-${Date.now()}`,
                title
            })
        },
        deleteHandler(id){
            this.list.filter((item,index)=>{
                if(item.id == id){
                    this.list.splice(index,1)
                }
            })
        }
    }
};
</script>

<style lang="stylus" scoped>

</style>
