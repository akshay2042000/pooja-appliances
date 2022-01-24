const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    path: {
        type: String,
        default: 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
    },
    name: {
        type: String,
        default: 'default image',
    }
});
// Compile model from schema
var Image = mongoose.model('Image', imageSchema);
module.exports = imageSchema;