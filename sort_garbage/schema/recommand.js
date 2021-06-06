const mongoose = require("mongoose")
const Schema = mongoose.Schema

const recomSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    city_id:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    time:{
        type:String
    },
    imgPath:{
        type:String
    }
})

module.exports = recommand = mongoose.model("recommand",recomSchema)