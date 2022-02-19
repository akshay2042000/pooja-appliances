// TODO: bill_id, bill_type, bill_date, bill_amount, bill_status, bill_description, bill_created_at, bill_updated_at

const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


var billSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    app: {
        type: String,
        required: true,
        enum: ['pooja', 'creative']
    },
    invoiceData: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true
});
// Compile model from schema
billSchema.plugin(AutoIncrement, { inc_field: 'invoiceNumber', start_seq: 1000, inc_amount: 1 });
var Bill = mongoose.model('Bill', billSchema);

//  reset the counter


module.exports = Bill;