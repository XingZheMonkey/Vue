const express=require('express');
const mongoose=require('mongoose');
const users=require("./routes/api/users");
const bodyParser=require('body-parser');
const db=require("./config/keys").mongoURI;
const passport=require("passport");
const profiles=require("./routes/api/Profile")

const app=express();

// 连接数据库
mongoose.connect(db,{
    useNewUrlParser:true
})
        .then(()=>{console.log("连接成功")})
        .catch((err)=>{console.log(err)})


// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(passport.initialize());                                                                                                            
require("./config/passport")(passport);

// 使用中间键加载路由
app.use("/api/users",users);
app.use("/api/profiles",profiles)

// 端口号
const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("运行成功，端口号"+port);
})