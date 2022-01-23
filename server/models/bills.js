// TODO: bill_id, bill_type, bill_date, bill_amount, bill_status, bill_description, bill_created_at, bill_updated_at

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billSchema = new Schema({
    bill_id: {
        type: String,
        required: true,
        unique: true
    },


}, {
    timestamps: true
});
// Compile model from schema
var Bill = mongoose.model('Bill', billSchema);