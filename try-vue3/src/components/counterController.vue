<template>
<div>
    <button @click="increment(1)">increment</button>
    <button @click="increment(-1)">increment</button>
</div>
</template>

<script>
export default {
    emits: [
        "onincrement"
    ],
    setup(props, context) {
        console.log(context)
        const increment = (num) => {
            context.emit("onincrement", num)
        }
        return {
            increment
        }
    }
}
</script>

<style scoped>

</style>
