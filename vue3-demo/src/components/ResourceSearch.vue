<template>
<!-- {/* 搜索框 start */} -->
<form class="card p-2">
    <div class="input-group">
        <input type="text" class="form-control" placeholder="写点啥..." @keyup="$emit('onsearch', $event.target.value)" />
    </div>
</form>
<!-- {/* 搜索框 Ends */} -->
</template>

<script>
export default {

}
</script>

<style lang="" scoped>

</style>
