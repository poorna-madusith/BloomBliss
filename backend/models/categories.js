const mongooese = require('mongoose');

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
    },
    description:{
        type: String,
        required: true
    },
})

module.exports = mongooese.model('Category', categoriesSchema);