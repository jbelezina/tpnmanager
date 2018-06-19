var express = require('express');
var router = express.Router();
var Alert = require('../models/Alert');
var mongoose = require('mongoose');
var options =   {
    poolSize: 100,
    promiseLibrary: global.Promise
  }     

var mongodbUri = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {

/* GET all Alerts. */
router.get('/', function(req, res, next) {
    Alert
        .find({})
        .exec(function(err, events) {
        res.json(events);
     });
});

router.put('/', function(req, res, next) {
    
    Alert.findById(req.params.id, function(err, alert) {
        if (!alert)
          return next(new Error('Could not update the alert'));
        else {
          // do your updates here
          alert.description = req.body.description;
      
          alert.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('alert modified')
          });
        }
      });
    });
  });

module.exports = router;