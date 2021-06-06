<template>
<!-- {/* 数据详情 Starts */} -->
<div>
    <h4 class="mb-3">数据内容</h4>
    <div class="card" v-if="!currentResource?._id">
        <div class="card-body">No Resource is selected :(</div>
    </div>

    <div v-else class="card">
        <div class="card-header">{{ currentResource.title }}</div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>{{ currentResource.description }}</p>
                <footer class="text-muted mb-2">{{ currentResource.type }}</footer>
            </blockquote>
            <a href="#" class="btn btn-primary mr-2">Link</a>
            <slot name="buttonLink"></slot>
        </div>
    </div>
</div>

<!-- {/* 数据详情 Ends */} -->
</template>

<script>
export default {
    props: {
        currentResource: {
            validator: (prop) => typeof prop === "object" || prop === null,
            required: true,
        },
    },
};
</script>

<style lang="" scoped>
</style>
