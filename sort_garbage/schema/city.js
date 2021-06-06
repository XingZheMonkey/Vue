const mongoose = require("mongoose")
const Schema =mongoose.Schema;

const citySchema = new Schema({
    text:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    motto:{
        type:String,
        required:true
    }
})

module.exports = city = mongoose.model("city",citySchema);