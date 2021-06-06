<template>
    <div>
        <button @click="showPop">点击弹窗</button>
    </div>
</template>

<script>
import Notice from "../components/Notice"
export default {
    methods: {
        showPop(){
            const notice = this.$create(Notice,{
                title: "花果山水帘洞齐天大圣",
                message:"请求登录",
                duration:1000
            });

            notice.show()
        }
    }
}
</script>

<style scoped>

</style>