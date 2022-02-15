const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const cartSchema = require('./carts');


var orderSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    app: {
        type: String,
        required: true,
        enum: ['pooja', 'creative']
    },
    items: [{
        type: cartSchema,
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isBilled: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
// Compile model from schema
var Order = mongoose.model('Order', orderSchema)
module.exports = Order;