const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Название отсутствует!!'
    },
    money:{
        type:Number,
        min:0
    },
    Requirements:String,
    Duties:String,
    Сonditions:String

})

module.exports = mongoose.model('Jobs', jobsSchema);