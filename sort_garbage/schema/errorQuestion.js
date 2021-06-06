const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const errorQuestionSchema=new Schema({
    errorQuestion:{
        type:String,
        required:true
    },
    answer:{
        type:Number,
        required:true
    },
    u_id:{
        type:String,
        required:true
    },
    q_id:{
        type:String,
        required:true
    }
})

module.exports = errorQuestion = mongoose.model("errorQuestion",errorQuestionSchema);