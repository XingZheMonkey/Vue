<template>
    <div class="inputGroup">
        <label>{{label}}</label>
        <input 
            :type="type"
            :placeholder="placeholder"
            @input="$emit('input',$event.target.value)"
        >
    </div>
</template>
<script>
export default {
    name:"inputGroup",
    props:{
        type:{
            type:String,
            default:'text'
        },
        placeholder:String,
        label:String
    }
}
</script>
<style scoped>
    .inputGroup{
        width:100%;
        height:60px;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        padding: 10px 0;
        line-height: 60px;
    }
    .inputGroup label{
        display:inline-block;
        width: 30%;
        font-size: 16px;
    }
    .inputGroup input{
        display: inline-block;
        width: 65%;
        font-size: 16px;
        border: none;
        outline: none;
    }
</style>

