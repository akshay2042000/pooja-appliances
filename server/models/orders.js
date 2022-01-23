const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const cartSchema = require('./carts');

var orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalAmount: {
        type: Number,
        min: 0,
        required: true,
    },
    items: [cartSchema],
    isBilled: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
// Compile model from schema
var Order = mongoose.model('Order', orderSchema);