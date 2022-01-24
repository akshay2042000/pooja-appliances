const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./images');

var companySchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    image: {
        type: imageSchema,
        default: {}
    },
    coverImage: {
        type: imageSchema,
        default: {}
    }
}, {
    timestamps: true
});
// Compile model from schema
var Company = mongoose.model('Company', companySchema);
module.exports = Company;