var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  type: {
    type: String,
    enum: ['tpn','drip','food','drink','drug'],
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Product', eventSchema);
