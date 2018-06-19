var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alertSchema = new Schema({
  description: {
    type: String,
  },
  measure: {
    type: String,
  },
  value: {
    type: Number,
  },
});

module.exports = mongoose.model('Alert', alertSchema);
