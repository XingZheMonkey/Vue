<template>
<h1>{{counter}}</h1>
</template>

<script>
export default {
    props: {
        counter: {
            type: Number,
            default: 200
        }
    }
}
</script>

<style scoped>

</style>
