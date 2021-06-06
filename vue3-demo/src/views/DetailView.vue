<template>
<div class="container">
    <div class="row">
        <ResourceDetail :currentResource="resource">
            <template #buttonLink>
                <button @click="$router.go(-1)" class="btn btn-outline-success">
                    返回
                </button>
            </template>
        </ResourceDetail>
    </div>
</div>
</template>

<script>
import ResourceDetail from "@/components/ResourceDetails.vue"
import {
    useRoute
} from "vue-router"

import {
    reactive,
    toRefs,
    onMounted
} from "vue"

import {
    fetchResource
} from "@/actions"
export default {
    components: {
        ResourceDetail
    },
    setup(props) {
        const route = useRoute()

        const data = reactive({
            resource: null
        })

        const {
            id
        } = route.params

        onMounted(async () => {
            const {
                id
            } = route.params;
            data.resource = await fetchResource(id);
        });

        return {
            ...toRefs(data)
        }
    }
}
</script>

<style lang="">

</style>
