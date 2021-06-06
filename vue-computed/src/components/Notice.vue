<template>
    <div class="box" v-if="isShow">
        <h3>{{title}}</h3>
        <p>{{message}}</p>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String
        },
        message:{
            type:String
        },
        duration:{
            type:Number
        }
    },
    data() {
        return {
            isShow:false
        }
    },
    methods: {
        show(){
            this.isShow = true;
            // setTimeout(this.hide,this.duration)
        },
        hide(){
            this.isShow = false;
            this.remove();
        }
    },
}
</script>