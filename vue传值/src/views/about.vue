<template>
    <div>
        about
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:"about",
    created() {
        console.log(this.$route)
    },
}
</script>