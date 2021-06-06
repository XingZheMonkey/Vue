<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    后台管理系统
                </span>
                <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerUser.checkPass" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份" prop="identity">
                        <el-select style="width:100%;" v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option value="teacher" label="教师">
                                教师
                            </el-option>
                            <el-option value="student" label="学生">
                                学生
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left:-30px;" type="primary" @click="submitForm('registerForm')">提交</el-button>
                        <el-button style="margin-left:30px;" @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name:"register",
    components:{

    },
     data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerUser.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
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
        registerUser: {
          password: '',
          checkPass: '',
          name:"",
          email:"",
          identity:""
        },
        rules: {
          password: [
            { required:true,validator: validatePass, trigger: 'blur' },
            { min:6,max:16,message:"密码长度应在6到16之间",trigger:'blur'}
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email:[
            { required:true,validator:checkEmail,  trigger: 'blur'}
          ],
          name:[
            {required:true,message:"请输入用户名",trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(registerForm) {
        this.$refs[registerForm].validate((valid) => {
          if (valid) {
            this.$axios.post("/api/users/register",this.registerUser)
                .then((data)=>{
                    this.$message({
                        message:"注册成功",
                        type:'success'
                    })
                    setTimeout(()=>{
                      this.$router.push({name:'login'})
                    },2000)      
                })
          }
        });
      },
      resetForm(registerForm) {
        this.$refs[registerForm].resetFields();
      }
    }
}
</script>
<style scoped>
    .register{
        width: 100%;
        height: 100%;
        background: url("../assets/wallpaper.jpg") no-repeat center center;
        background-size: 100% 100%;
        overflow: hidden;
    }
    .form_container{
        width: 370px;
        height: 210px;
        margin: 8% auto;
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
    .registerForm{
        margin-top: 20px;
        background-color: #fff;
        padding: 50px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #cccc;
    }
</style>


