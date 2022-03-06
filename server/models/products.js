const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./images');

unitSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    pcPerUnit: {
        type: Number,
        default: 1
    }
})

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


var productSchema = new Schema({


    name: {
        type: String,
        required: true,
    },
    images: [{
        type: imageSchema,
        default: {}
    }],

    units: [
        {
            type: unitSchema,
            unique: true,
        }
    ],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],

    variants: {

        colors: [
            {
                type: colorSchema,
                unique: true,
            }
        ],

        sizes: [
            {
                type: sizeSchema,
                unique: true,
            },
        ],
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },

    hsnCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HsnCode',
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true
});
// Compile model from schema
var Product = mongoose.model('Product', productSchema);

module.exports = { Product, unitSchema, colorSchema, sizeSchema };