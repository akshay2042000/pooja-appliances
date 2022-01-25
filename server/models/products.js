const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./images');


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
    image: {
        type: imageSchema,
        default:{}
    },
  

    units: [{
        type: String,
    }],

    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],

    // // name: {
    // //     type: String,
    // // },
    // // defaults: {
    // //     color: {
    // //         type: colorSchema,
    // //     },
    // //     size: {
    // //         type: sizeSchema,
    // //     },
    // //     price: {
    // //         type: Number,
    // //         required: true,
    // //     }
    // // },

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
    }

}, {
    timestamps: true
});
// Compile model from schema
var Product = mongoose.model('Product', productSchema);
module.exports = Product;