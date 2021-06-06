const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const questionSchema=new Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    situation:{
        type:String,
        required:true
    }
})

module.exports = question = mongoose.model("question",questionSchema);