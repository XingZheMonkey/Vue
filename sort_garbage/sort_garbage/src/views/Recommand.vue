<template>
    <div>
        <Info title="推荐资讯" :info="infomation"></Info>
    </div>
</template>

<script>
import Info from "../components/Info"
export default {
    name:"info",
    data(){
        return {
            infomation:{},
            id:this.$route.params.id
        }
    },
    components:{
        Info
    },
    created() {
        this.$axios
        .get(`http://localhost:2728/api/recommand/recommandContent/${this.id}`)
        .then(res => {
            this.infomation = res.data;
        });
    }
}
</script>