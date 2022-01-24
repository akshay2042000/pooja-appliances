const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = require('./image');

var companySchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    image:{
        type: imageSchema,  
    },
    coverImage:{
        type: imageSchema,
    }
}, {
    timestamps: true
});
// Compile model from schema
var Company = mongoose.model('Company', companySchema);
module.exports = Company;