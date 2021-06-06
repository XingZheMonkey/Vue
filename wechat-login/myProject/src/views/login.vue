<template>
    <div class="login">
        <div class="title">用户登录</div>
        <div class="content">
            <form action="">
                <inputGroup
                    label="账号"
                    placeholder="请填写邮箱"
                    v-model="user.email"
                />
                <inputGroup
                    label="密码"
                    placeholder="请填写密码"
                    v-model="user.password"
                    type="password"
                />
            </form>
            <div class="btn_wrap">
                <commonButton :disabled="isDisabled" @click="loginClick">登录</commonButton>
            </div>
        </div>
        <div class="footer_wrap">
            <button class="register" @click="$router.push({name:'register'});">| 注册账号 |</button>
        </div>
    </div>
</template>

<script>
import inputGroup from '../components/inputGroup'
import commonButton from '../components/commonButton'
export default {
    name:"login",
    components:{
        inputGroup,
        commonButton
    },
    data(){
        return {
            user:{
                password:"",
                email:""
            },
            status:[],
        }
    },
    computed:{
        isDisabled(){
            if(this.user.email && this.user.password){
                return false;
            }else{
                return true;
            }   
        }
    },
    methods:{
        loginClick(){
            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(!reg.test(this.user.email)){
                alert("请输入合法的邮箱地址");
                return;
            }

            axios.post("/api/users/login",this.user)
                 .then(data=>{
                     this.$message({
                         message:"登陆成功",
                         type:'success'
                     })
                     console.log(data)
                 })
                 .catch(err=>{
                    //  提示接口中的错误信息
                    this.$message.error(err.response.data)
                 })
        }
    }
}
</script>
<style scoped>
    .login{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 16px;
        box-sizing: border-box;
    }
    .title{
        margin-top: 80px;
        font-size: 22px;
        text-align:center;
    }
    .footer_wrap{
        position: absolute;
        left: 0;
        bottom: 16px;
        text-align: center;
        width: 100%;
        color: #888;
    }
    .footer_wrap .register{
        font-size: 16px;
        outline: none;
        border:none;
        background-color: transparent;
        color: #7b8ca9;
    }
    .content,
    .btn_wrap{
        margin-top: 30px;
    }
</style>


