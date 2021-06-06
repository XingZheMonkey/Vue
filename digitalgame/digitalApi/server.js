const express=require('express');
const mongoose=require('mongoose');
const app=express();
const game=require('./routes/api/game');
const bodyParser=require('body-parser');


// 连接数据库
mongoose.connect("mongodb://localhost/digitalApi",{
    useNewUrlParser:true,
    useFindAndModify:true
})
        .then(()=>{
            console.log("mongoose connect successful");
        })
        .catch((err)=>{
            console.log(err);
        })

// 使用body-parser
app.use(bodyParser.urlencoded({expanded:false}));
app.use(bodyParser.json());

app.use('/api/game',game);

//监听端口

app.listen("7090",()=>{
    console.log("监听成功，端口号7090");
})