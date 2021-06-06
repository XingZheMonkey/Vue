const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const userSchema=new Schema({
    courseName:{
        type:String,
        required:true
    },
    courseLevel:{
        type:String,
        required:true
    },
    type:{
        type:String
    },
    count:{
        type:Number
    },
    date:{
        type:Date
    }
}) 

module.exports = profile = mongoose.model("profiles",userSchema);