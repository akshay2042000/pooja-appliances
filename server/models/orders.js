const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
    },
    billingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        default: null,
    }
}, {
    timestamps: true
});
// Compile model from schema
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId', start_seq: 100 });
var Order = mongoose.model('Order', orderSchema)

module.exports = Order;