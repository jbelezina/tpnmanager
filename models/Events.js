var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  updated: { 
    type: Date, 
    default: Date.now 
  },
  event_type: {
    type: String,
    enum: ['tpn','drip','food','drink','drug','colostomy','ilestomy','weight','pressure','temperature'],
  },
  time_start: {
    type: Date,
  },
  time_stop: {
    type: Date,
  },
  comment: String,
  values: [],
  product_id: Number,
  patient_id: Number,
});

module.exports = mongoose.model('Event', eventSchema);
