const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./image');

var categorySchema = new Schema({
    name: {
        type: String,
        default: 'default category'
    },
    image: {
        type: imageSchema,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});
// Compile model from schema
var Category = mongoose.model('Category', categorySchema);
module.exports = Category;