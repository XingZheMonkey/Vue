<template>
<div class="container">
    <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">数据</span>
                <span class="badge badge-secondary badge-pill">{{getResourceLength}}</span>
            </h4>
            <ResourceSearch @onsearch="handleSearch($event)"></ResourceSearch>
            <ResourceList @handleitemclick="selectResource" :resources="resources" :activeId="activeResource?._id"></ResourceList>
            <!-- 添加按钮 
            <button @click="addResource" class="btn btn-sm btn-primary">
                添加数据
            </button>
            -->
        </div>
        <!-- {/* 更新数据 Starts */} -->
        <div class="col-md-8 order-md-1">
            <h4 class="mb-3">
                数据 {{ activeResource?._id }}
                <button @click="isDetailView = !isDetailView" :class="`btn btn-sm ${toggleBtnClass} mr-2`">
                    {{ !isDetailView ? "详情" : "更新" }}
                </button>
                <ResourceDelete @onResourceDelete="handleResourceDelete($event)" :activeId="activeResource?._id" />
            </h4>

            <ResourceUpdate @onupdateresource="handleUpdateResource" v-if="isDetailView" :currentRes="activeResource"></ResourceUpdate>
            <ResourceDetails :currentResource="activeResource" v-else>
                <template #buttonLink>
                    <router-link class="btn btn-outline-success" :to="{
              name: 'Detail',
              params: { id: activeResource?._id },
            }">详情</router-link>
                </template>
            </ResourceDetails>
        </div>
        <!-- {/*  更新数据 Ends */} -->

    </div>
</div>
</template>

<script>
import {
    reactive,
    toRefs,
    computed,
    ref,
    onMounted
} from "vue"

import ResourceSearch from "@/components/ResourceSearch.vue"
import ResourceList from "@/components/ResourceList.vue"
import ResourceUpdate from "@/components/ResourceUpdate.vue"
import ResourceDetails from "@/components/ResourceDetails.vue"
import ResourceDelete from "@/components/ResourceDelete.vue"
import {
    fetchResources,
    searchResources
} from "@/actions"
export default {
    components: {
        ResourceSearch,
        ResourceList,
        ResourceUpdate,
        ResourceDetails,
        ResourceDelete
    },
    setup() {
        const data = reactive({
            resources: [],
        });

        const isDetailView = ref(false)

        const selectedResource = ref(null)

        // computed
        const toggleBtnClass = computed(() => {
            return isDetailView.value ? "btn-primary" : "btn-warning";
        });

        const getResourceLength = computed(() => {
            return data.resources.length
        })

        const activeResource = computed(() => {
            return (
                selectedResource.value ||
                (getResourceLength.value > 0 && data.resources[0]) ||
                null
            );
        });

        // 生命周期钩子函数
        onMounted(() => {
            getResources();
        });

        // methods
        // const addResource = () => {
        //     const _id = "_" + Math.random().toString(36).slice(2);
        //     const type = ["book", "blog", "video"][Math.floor(Math.random() * 3)];
        //     const newResource = {
        //         _id,
        //         title: `${_id} title`,
        //         description: `${_id} description`,
        //         link: "",
        //         type,
        //     };

        //     data.resources.unshift(newResource);
        // };
        const getResources = async () => {
            const resources = await fetchResources();
            data.resources = resources;
        };

        const selectResource = (resource) => {
            // 被选中的item
            selectedResource.value = resource;
        };

        const handleUpdateResource = (newResource) => {
            const index = data.resources.findIndex(
                (resource) => resource._id === newResource._id
            );
            data.resources[index] = newResource;

            selectResource(newResource);
        };

        const handleResourceDelete = (newResource) => {
            const index = data.resources.findIndex(
                (resource) => resource._id === newResource._id
            );

            data.resources.splice(index, 1);
            selectResource(data.resources[0] || null);
        };

        const handleSearch = async (title) => {
            if (!title) {
                getResources();
                return;
            }
            data.resources = await searchResources(title);
            selectedResource.value = null;
        };

        return {
            ...toRefs(data),
            getResourceLength,
            isDetailView,
            toggleBtnClass,
            // addResource,
            selectResource,
            activeResource,
            handleUpdateResource,
            handleResourceDelete,
            handleSearch
        }
    }
}
</script>

<style>

</style>
