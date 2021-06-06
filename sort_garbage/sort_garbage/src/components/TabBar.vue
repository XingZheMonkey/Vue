<template>
    <div class="tabbar">
        <van-tabbar v-model="active" route>
            <van-tabbar-item replace icon="home-o" to="/">
                首页
            </van-tabbar-item>
            <van-tabbar-item replace icon="scan" to="/recognize" >
                查询
            </van-tabbar-item>
            <van-tabbar-item replace icon="records" to="/examination">
                测试
            </van-tabbar-item>
            <van-tabbar-item icon="setting-o" replace to="/user">
                设置
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name:"tabbar",
    data(){
        return {
            active:0
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
</style>