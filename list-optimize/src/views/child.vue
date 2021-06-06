<template>
    {{msg.count}}
    <button @click="add"> 加一 </button>
</template>

<script setup>
import { defineProps, defineEmit, useContext } from 'vue'

// 父传子
const msg = defineProps({
    count:Number
})

const { expose } = useContext();


// 子传父
const emit = defineEmit(['updateCount']);

const add = ()=>{
    emit('updateCount')
}


const testExpose = ()=>{
    console.log('expose')
}

const testExp = ()=>{
    console.log('expo')
}

expose({
    testExpose
})

</script>