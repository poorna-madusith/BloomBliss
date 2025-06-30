const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    id:{
        type:Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Category', categoriesSchema);