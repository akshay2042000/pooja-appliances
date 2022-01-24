const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
});
// Compile model from schema
var State = mongoose.model('State', stateSchema);
module.exports = State;