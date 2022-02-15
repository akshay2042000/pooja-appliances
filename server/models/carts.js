const mongoose = require('mongoose');
var Schema = mongoose.Schema;


colorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    hex: {
        type: String,
        required: true,
    }
})

sizeSchema = new Schema({
    val: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})


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
    },
    color: {
        type: colorSchema,
        required: true,
    },
    size: {
        type: sizeSchema,
        required: true,
    },
    
});
// Compile model from schema
module.exports = cartSchema;
