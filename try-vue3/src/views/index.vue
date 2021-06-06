<template>
<div id="index">
    <counterView :counter="counter"></counterView>
    <counterController @onincrement="increment($event)"></counterController>
</div>
</template>

<script>
import counterView from "@/components/counterView.vue"
import counterController from "@/components/counterController.vue"
import {
    ref
} from "vue"
export default {
    components: {
        counterView,
        counterController
    },
    setup() {
        const counter = ref(100)
        const increment = (num) => {
            counter.value += num
        }
        return {
            increment,
            counter
        }
    }
}
</script>

<style scoped>

</style>
