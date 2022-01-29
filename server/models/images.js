const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    path: {
        type: String,
        default: 'https://media.istockphoto.com/photos/abstract-wavy-object-picture-id1198271727?b=1&k=20&m=1198271727&s=170667a&w=0&h=b626WM5c-lq9g_yGyD0vgufb4LQRX9UgYNWPaNUVses=',
    },
    name: {
        type: String,
        default: 'default image',
    }
});
// Compile model from schema
var Image = mongoose.model('Image', imageSchema);
module.exports = imageSchema;