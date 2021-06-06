<template>
    <div class="index">
        <headNav/>
        <leftMenu/>
        <div style="width:100%;height:100%;margin-left:180px;">
            <router-view></router-view>
        </div>
        
    </div>
</template>
<script>
import headNav from '../components/header'
import leftMenu from '../components/leftMenu'
export default {
    name:"index",
    components:{
        headNav,
        leftMenu
    }
}
</script>
<style scoped>
    .index{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>

