// TODO: bill_id, bill_type, bill_date, bill_amount, bill_status, bill_description, bill_created_at, bill_updated_at

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const cartSchema = require('./carts');

var billSchema = new Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    invoiceAmount: {
        type: Number,
        required: true
    },
    invoiceGenerated: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    app: {
        type: String,
        required: true,
        enum: ['pooja', 'creative']
    },
    cartItemList: [{
        type: cartSchema,
        required: true
    }],

}, {
    timestamps: true
});
// Compile model from schema
var Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;