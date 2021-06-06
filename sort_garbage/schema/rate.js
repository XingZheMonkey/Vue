const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const rateSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        default:3
    }
})

module.exports = rate = mongoose.model("rate",rateSchema);