<template>
  <input :type="type" :placeholder="placeholder" @input="$emit('input',$event.target.value)"/>
</template>


<script>
export default {
    props:{
        placeholder:{
            type:String
        },
        type:{
            type:String
        }
    }
}
</script>

<style lang="less" scoped>
input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;

  &:focus {
    outline: none;
    border-color: #409eff;
  }
}
</style>