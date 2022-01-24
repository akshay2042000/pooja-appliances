const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hsnCodeSchema = new Schema({
    hsnNumber: {
        type: Number,
        required: true,
        unique: true
    },
    SGST: {
        type: Number,
        default: 0,
    },
    CGST: {
        type: Number,
        default: 0,
    },
    IGST: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});
// Compile model from schema
var HsnCode = mongoose.model('HsnCode', hsnCodeSchema);
module.exports = HsnCode;