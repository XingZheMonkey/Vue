const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://img.yzcdn.cn/vant/cat.jpeg"
    },
    simpleScore:{
        type:Number,
        default:0
    },
    primaryScore:{
        type:Number,
        default:0
    },
    difficultScore:{
        type:Number,
        default:0
    },
    advanceScore:{
        type:Number,
        default:0
    },
    sumScore:{
        type:Number,
        default:0
    }
})

module.exports = user = mongoose.model("user",userSchema);