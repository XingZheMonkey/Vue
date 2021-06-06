<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    后台管理系统
                </span>
                <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width:100%;" type="primary" @click="submitForm('loginForm')">提交</el-button>
                    </el-form-item>
                    <div class="link">
                        <span>还没有账号？现在</span>
                        <router-link to="/register">注册</router-link>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name:"login",
    components:{

    },
     data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginUser.checkPass !== '') {
            this.$refs.loginForm.validateField('checkPass');
          }
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
        return callback(new Error("邮箱不能为空"))
        }
        setTimeout(() => {
        if (mailReg.test(value)) {
            callback()
        } else {
            callback(new Error("请输入正确的邮箱格式"))
        }
        }, 100)
      }
      return {
        loginUser: {
          password: '',
          email:""
        },
        rules: {
          password: [
            { required:true,validator: validatePass, trigger: 'blur' },
            { min:6,max:16,message:"密码长度应在6到16之间",trigger:'blur'}
          ],
          email:[
            { required:true,validator:checkEmail,  trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(loginForm) {
        this.$refs[loginForm].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/login",this.loginUser)
                .then((data)=>{
                    const {token}=data.data;
                    console.log(data.data)
                    localStorage.setItem("eleToken",token);
                    this.$router.push({name:"index"});
                })
          }
        });
      }
    }
}

</script>
<style scoped>
    .login{
        width: 100%;
        height: 100%;
        background: url("../assets/wallpaper.jpg") no-repeat center center;
        background-size: 100% 100%;
        overflow: hidden;
    }
    .form_container{
        width: 370px;
        height: 210px;
        margin: 12% auto;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        
    }
    .form_container .manage_tip .title{
        font-family: 'Microsoft YaHei';
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }
    .loginForm{
        margin-top: 40px;
        background-color: #fff;
        padding: 50px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #cccc;
    }
    .link{
        font-size: 10px;
        text-align: right;
    }
</style>


