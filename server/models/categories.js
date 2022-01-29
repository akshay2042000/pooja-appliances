const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./images');

var categorySchema = new Schema({
    name: {
        type: String,
        default: 'default category'
    },
    image: {
        type: imageSchema,
        default: {}
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    app: [
        {
            type: String,
            required:true,
            enum: ['pooja', 'creative']
        }
    ]
}, {
    timestamps: true
});
// Compile model from schema
var Category = mongoose.model('Category', categorySchema);
module.exports = Category;