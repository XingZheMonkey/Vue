const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const gameSchame=new Schema({
    gameTitle:{
        type:String,
        required:true
    },
    correctPath:{
        type:String,
        required:true
    },
    distractors:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    state:{
        type:Boolean,
        default:true
    },
    comments:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    }
})

module.exports = game = mongoose.model('game',gameSchame);