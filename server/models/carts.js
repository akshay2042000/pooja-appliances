const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { unitSchema } = require('./products');
const { colorSchema } = require('./products');
const { sizeSchema } = require('./products');

var cartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    unit: {
        type: unitSchema,
        required: true,
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
