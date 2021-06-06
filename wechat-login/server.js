const express=require("express");
const mongoose=require("mongoose");
const users=require('./routes/api/users');
const bodyParser=require('body-parser');
const passport=require('passport');

const app=express();

mongoose.connect("mongodb://localhost/wApi",{
    useNewUrlParser:true
})
    .then(()=>{
        console.log("mongoose connect successful");
    })
    .catch((err)=>{
        console.log(err);
    })


// 实例化body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 使用passport
app.use(passport.initialize());
require('./config/passport')(passport);


app.use("/api/users",users);


app.listen("7080",()=>{
    console.log("server is running,port is 7080");
})