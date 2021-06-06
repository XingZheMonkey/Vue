<template>
  <div v-img class="monkey" :data="currentImg">
    <div class="sty">
      <img :src="currentImg" />
      <ul>
        <li v-for="(item,index) in imgSrc" @click="choose(index)" v-bind:class="{active:currentIndex===index}">
            {{item.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let arr = [
        {src:require("../assets/king.jpg"),title:"the first img"},
        {src:require("../assets/monkey.jpg"),title:"the second img"},
        {src:require("../assets/monkey.png"),title:"the third img"} 
    ];
    return {
      imgSrc: arr,
      currentIndex:0
    };
  },
  created(){
      
  },
  computed: {
    currentImg() {
      return this.imgSrc[this.currentIndex].src;
    }
  },
  methods:{
      choose(index){
          this.currentIndex=index;
      }
  },
  directives:{   
      'img':{
        bind:(el,binding,vnode)=>{
            setInterval(()=>{
                let a=el.getAttribute("data");
                el.style.backgroundImage=`url('${a}')`;
            },800)
        }
      }
  }
};
</script>

<style scoped>
.monkey {
  width: 90%;
  height: 100%;
  overflow: hidden;
  background:url("../assets/king.jpg") no-repeat;
  background-size:cover;
}
img {
  width: 900px;
  height: 600px;
}
ul,
li {
  list-style: none;
}
li{
    background: rgb(87, 185, 241);
    margin-left: 20px;
    display: inline-block;
    padding: 20px;
}
li:nth-of-type(1){
    margin-left: 20%;
}
.sty{
    margin:6% 20%;
    width: 60%;
}
.active{
    background: rgb(58, 238, 58);
}
</style>


