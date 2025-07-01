const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        flowerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flower',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        required: true,
        default: 10
    },
    total: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    contactInfo: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        }
    },
    paymentInfo: {
        cardNumber: String, // Last 4 digits only
        expiryDate: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
