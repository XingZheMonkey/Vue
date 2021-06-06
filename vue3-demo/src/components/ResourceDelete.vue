<template>
<button @click="handleDeleteResource" class="btn btn-sm btn-danger">
    删除
</button>
</template>

<script>
import {
    deleteResource
} from "@/actions";
export default {
    props: {
        activeId: String,
    },
    setup(props, context) {
        const handleDeleteResource = async () => {
            // 请求数据接口
            const deleteData = await deleteResource(props.activeId);
            context.emit("onResourceDelete", deleteData);
        };
        return {
            handleDeleteResource
        };
    },
};
</script>
