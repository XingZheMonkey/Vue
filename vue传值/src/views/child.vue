<template>
    <div class="child">
        <p>{{parentData}}</p>
        <button @click="change">点击</button>

        <cv-button
            kind="primary"
            :small="small"
            :disabled="disabled"
            @click="actionClick"
            :icon="icon"
            >
            获取数据
        </cv-button>

        <cv-loading
            v-show="isT"
            :active="active"
            :overlay="overlay"
            :small="small"
            @loading-end="actionEnd">
        </cv-loading>

        <!-- 通过v-bind将父级中的数据继续向下传递 -->
        <threechild v-bind="$attrs" @binda="this.$listeners.bindtwo"/>
    </div>
</template>
<script>
import threechild from './threechild'
export default {
    name:"child",
    data(){
        return {
            childData:"我是子级中的数据",
            "small": true,
            isT:false,
            "disabled": false,
            "icon": null,
            "active": true,
            "overlay": true,
            "small": false
        }
    },
    props:{
        parentData:{
            type:String    /* 一定要有类型声明 */
        }
    },
    components:{
        threechild
    },
    inject:['pig'],
    methods:{
        test(){
            console.log("asd")
        },
        change(){
            this.$emit("passData",this.childData);
            // 可以传递数据，同样也可以传递方法 例如:this.test()
        },
        actionEnd(){
            
        },
        actionClick(){
            this.isT=true;
        }
    },
    created(){
        this.$listeners.bindtwo()  // 通过this.$listener获取父级中的方法
        console.log("通过this.$attrs获取父级中的属性: "+this.$attrs.bindattr) // 通过this.$attrs获取父级中的属性
        // inject(子，{default} )  provide(父) 传递  

        console.log("孩子组件打印 --- 通过provide传递的数据 : "+this.pig)


        console.log(this.$parent)
    }
}
</script>
<style scoped>
    .child{
        width: 80%;
        background: rgb(226, 149, 60);
        margin: 0 auto;
        padding: 30px;
    }
</style>


