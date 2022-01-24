const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./image');

var productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: imageSchema,
    },


    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],

    variants: [
        {
            color: [
                {
                    name: String,
                    hex: String,
                    unique: true,
                    default:''
                    
                },
            ],
            size: [
                {
                    val: String,
                    price: Number,
                    unique: true,
                    default:''
                },
            ],
        }
    ],

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },

    hsn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hsn',
        required: true,
    }

}, {
    timestamps: true
});
// Compile model from schema
var Product = mongoose.model('Product', productSchema);
module.exports = Product;