const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const knowSchema = new Schema({
    updateTime: {
        type: String
    },
    updateContent: {
        type: String
    }
})

module.exports = knowledge = mongoose.model('knowledge',knowSchema)