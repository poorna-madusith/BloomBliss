const mongoose = require('mongoose');

const flowersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    category:{
        type: Number,
        ref: 'Category',
        required: true,
    }

})

module.exports = mongoose.model('Flower', flowersSchema);