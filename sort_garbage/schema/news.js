const mongoose = require("mongoose")
const Schema = mongoose.Schema

const newsSchmea = new Schema({
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

module.exports = news = mongoose.model("news",newsSchmea)