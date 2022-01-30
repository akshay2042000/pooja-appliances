const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    gstNumber: {  // same as username
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    }
}, {
    timestamps: true
});
// Compile model from schema
var User = mongoose.model('User', userSchema);
module.exports = User;