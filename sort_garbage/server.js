const express = require("express");
const app = express();
const path = require("path");
const expressStatic = require("express-static");

const mongoose=require("mongoose")
const bodyParser = require("body-parser")
const passport=require("passport")

const users=require("./routes/api/user")
const recognize=require("./routes/api/recognize")
const rate=require("./routes/api/rate")
const exam=require("./routes/api/exam")
const location=require("./routes/api/location")
const city = require("./routes/api/city")
const news = require("./routes/api/news")
const recommand = require("./routes/api/recommand")

// 链接数据库
mongoose.connect("mongodb://localhost/sort_garbage",{
    useFindAndModify:true,
    useNewUrlParser:true,
    useFindAndModify:true
})
        .then(()=>{
            console.log("mongoose connect successfully")
        })
        .catch((err)=>{
            console.log(err)
        })

// 处理大文件
app.use(express.json({limit: '5mb'}));

// 使用body-parser
app.use(bodyParser.urlencoded({
    expanded: false
}));
app.use(bodyParser.json());

// 使用passport验证token
app.use(passport.initialize());
require('./config/passport')(passport);

// 配置跨域
app.all("*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.use("/api/",recognize)
app.use("/api/user/",users)
app.use("/api/rate/",rate)
app.use("/api/exam/",exam)
app.use("/api/location/",location)
app.use("/api/city/",city)
app.use("/api/news/",news)
app.use("/api/recommand/",recommand)

app.listen(2728, () => {
    console.log("连接成功，端口号2728")
})


app.use(expressStatic(__dirname))




