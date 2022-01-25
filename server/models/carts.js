const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    unit: {
        type: String,
        default: 'pc',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});
// Compile model from schema
var Cart = mongoose.model('Cart', cartSchema);
module.exports = cartSchema;
