<template>
  <div class="userRank">
    <nHeader title="排行榜">
      <div slot="back">&lt;</div>
    </nHeader>

    <div class="content">

      <div class="ul">
        <table>
          <tr style="background:#f5f7f9;color:#657180;">
            <td>排名</td>
            <td>昵称</td>
            <td>积分</td>
          </tr>
          <tr v-for="(res,index) in allUser">
            <td v-if="img[index]">
              <img :src="img[index]" alt="">
            </td>
            <td v-else>
              <div>{{index+1}}</div>
            </td>
            <td>{{res.name}}</td>
            <td>{{res.sumScore}}</td>
          </tr>
        </table>
      </div>
      
    </div>
  </div>
</template>

<script>
import nHeader from "../components/Header";
export default {
  data(){
    return {
      allUser:{},
      img:[
        require("../assets/No1.png"),
        require("../assets/No2.png"),
        require("../assets/No3.png")
      ]
    }
  },
  components: {
    nHeader
  },
  created() {
    this.$axios
      .get("http://localhost:2728/api/user/allUser")
      .then(res => {
        this.allUser=res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.userRank{
  width: 100%;
  height: 100%;
  background: white;
}
.ul {
  margin-top: 10px;
  width: 100%;
}
table {
  border-collapse: collapse;
  /* border: 1px solid #dbdbdb; */
  width: 100%;
}
tr > td {
  padding: 8px 10px;
  font-size: 12px;
  text-align: center;
  color: #363636;
  border-bottom: 1px solid #dbdbdb;
}
.content{
  padding: 10px;
}
</style>