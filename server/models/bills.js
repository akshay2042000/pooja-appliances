// TODO: bill_id, bill_type, bill_date, bill_amount, bill_status, bill_description, bill_created_at, bill_updated_at

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const cartSchema = require('./carts');

var billSchema = new Schema({
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
billSchema.plugin(AutoIncrement, { inc_field: 'invoiceNumber', start_seq: 100 ,inc_amount: 1});
var Bill = mongoose.model('Bill', billSchema);

//  reset the counter


module.exports = Bill;