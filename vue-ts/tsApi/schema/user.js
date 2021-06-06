const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true
    },
    autoLogin:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"游客"
    },
    des:{
        type:String
    }
}) 

module.exports = user = mongoose.model("users",userSchema);