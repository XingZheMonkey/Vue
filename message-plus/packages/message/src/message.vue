<template>
  <!-- transition动画必须有显示隐藏操作，因此增加 v-show -->
  <transition name="z-message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :class="[myClass,'z-message']">
        {{message}}
    </div>
  </transition>
</template>

<script lang="ts">
import {computed, defineComponent,PropType , ref, onMounted, onUnmounted} from 'vue'
import type {IType} from "./message.type"
export default defineComponent({
    props:{
        id:{
            type:String,
            default:''
        },
        message:{
            type:String,
            default:''
        },
        type:{
            type:String as PropType<IType>,
            default:'info'
        },
        duration:{
            type:Number,
            default:6000
        },
        center:{
            type:Boolean,
            default:false
        },
        onClose:{
            type:Function as PropType<()=>void>
        },
        offset:{
            type:Number,
            default: 20
        }
    },
    setup(props){
        const myClass = computed(()=>[
            'z-message--' + props.type,
            props.center ? 'is-center' : ''
        ])

        const visible = ref(false)
        
        let timer = null;
        const startTimer = ()=>{
            timer = setTimeout(() => {
                visible.value = false
            }, props.duration as number);
        }
        
        onMounted(()=>{
            visible.value = true;
            startTimer();
        })

        onUnmounted(()=>{
            clearTimeout(timer)
        })

        return {
            myClass,
            visible
        }
    }
    
})
</script>