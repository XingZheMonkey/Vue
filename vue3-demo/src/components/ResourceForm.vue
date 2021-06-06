<template>
<form>
    <div class="mb-3">
        <label for="title">标题</label>
        <input v-model="uResource.title" type="text" class="form-control" id="title" placeholder="title...." />
    </div>

    <div class="mb-3">
        <label for="description">描述</label>
        <textarea v-model="uResource.description" class="form-control" id="description" placeholder="描述"></textarea>
    </div>
    <div class="mb-3">
        <label for="type">类型</label>
        <select class="form-control" id="type" v-model="uResource.type">
            <option v-for="(resourceType, index) in types" :key="index" :value="resourceType">
                {{ resourceType }}
            </option>
        </select>
    </div>
    <div class="mb-3">
        <label for="link">链接</label>
        <div class="input-group">
            <input v-model="uResource.link" type="text" class="form-control" id="link" placeholder="链接...." />
        </div>
    </div>
    <hr class="mb-4" />
    <button @click="submitForm()" class="btn btn-primary btn-lg btn-block" type="button">
        提交
    </button>
</form>
</template>

<script>
import {
    ref,
    watch
} from "vue"

export default {
    props: {
        currentResource: Object
    },
    setup(props, context) {

        const uResource = ref(props.currentResource)

        const types = ["blog", "video", "book"]

        watch(() =>
            props.currentResource, (resource) => {
                uResource.value = resource
            })

        const submitForm = () => {
            context.emit("onSubmitForm", uResource)
        }

        return {
            uResource,
            types,
            submitForm
        }
    }
}
</script>
