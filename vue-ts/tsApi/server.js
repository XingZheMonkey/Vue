const Koa=require("koa")
const bodyParser=require("koa-bodyparser")
const mongoose=require("mongoose")
const passport=require("koa-passport")

const user=require("./routes/api/user")
const profile=require("./routes/api/profile")

const app=new Koa();

// 连接数据库
mongoose.connect("mongodb://localhost/tsApi")
        .then(()=>{
            console.log("数据库连接成功")
        })
        .catch(()=>{
            console.log("数据库连接失败")
        })

// 验证token
app.use(passport.initialize());
app.use(passport.session());                                                                                                           
require("./config/passport")(passport);

// 使用bodyparser
app.use(bodyParser())

// 实例化路由
app.use(user.routes())
app.use(profile.routes())

app.listen(5080,()=>{
    console.log("监听成功，端口号5080")
})