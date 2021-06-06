<template>
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <ResourceForm @onSubmitForm="handleCreate" :currentResource="resource"></ResourceForm>
        </div>
    </div>
</div>
</template>

<script>
import ResourceForm from "@/components/ResourceForm.vue"
import {
    useRouter
} from "vue-router";
import {
    reactive,
    toRefs
} from "vue"
import {
    createResource
} from "@/actions";
export default {
    components: {
        ResourceForm
    },
    setup(props) {

        const router = useRouter()

        const data = reactive({
            resource: {
                title: "",
                description: "",
                type: "video",
                link: "",
            }
        })

        const handleCreate = async (resource) => {
            await createResource(resource.value);
            router.push("/")
        };

        return {
            ...toRefs(data),
            handleCreate
        }
    }
}
</script>
