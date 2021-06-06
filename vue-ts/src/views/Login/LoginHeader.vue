<template>
    <div class="login-header">
        <slot name="form"></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components:{}
})
export default class Layout extends Vue {}
</script>

<style scoped>
    .login-header{
        width: 100%;
        height: 960px;
        background: url("../../assets/bg.jpg");
        overflow: hidden;
    }
</style>