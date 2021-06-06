<template>
    <button
        class="btn"
        :class="{'is-disabled':disabled}"
        :disabled="disabled"
        @click="$emit('click')"
    >
    <!-- 插槽 -->
    <slot></slot>
    </button>
</template>
<script>
export default {
    name:"btn",
    props:{
        type:String,
        disabled:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style scoped>
    .btn{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;  /*规定文本不换行*/
        cursor: pointer;
        color: #fff;
        background-color: #20af0e;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #20af0e;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 4px;
        width: 100%;
    }
    .is-disabled,
    .is-disabled:focus,
    .is-disabled:hover{
        color: #fff;
        background-color: #75b56c;
        border-color: #75b56c;
        cursor:not-allowed;  /*使按钮失效不能点击*/
        pointer-events: none; /*使按钮失效不能点击*/
    }
</style>


