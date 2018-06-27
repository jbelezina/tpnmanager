var express = require('express');
var router = express.Router();
var Alert = require('../models/Alert');
var Event = require('../models/Event');
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
     })
});

/* PUT Alerts by _id. */
router.put('/', function(req, res, next) {
  
  console.log('req.body to: ' + req.body);

  Alert
      .findById(req.body.alertID)
      .exec(function(err, alert) {
        if (err)
        res.send(err);
        alert.value = req.body.value;  
        alert.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Alert updated!' });
        });
      })
});

router.get('/maxWeeklyTpn', function(req, res, next) {
  let actual = 0;
  let max;
  let description;
  let measure;
  Alert
      .findById("5b293c0d039cc229b8db7095")
      .exec(function(err, alert) {
        max = alert.value;
        description = alert.description;
        measure = alert.measure;
        console.log('max to jest :' + max);
        let startDate = new Date() 
        startDate.setDate(startDate.getDate()-7) 
        Event
            .find(
              {time_stop:{$gte: startDate},
                event_type:"tpn"})
            .exec(function(err, events) {
              console.log('alerts', events)
              arrToAdd = events.map((item)=>{
                actual += item.values[0]["value"]
                console.log('actual' + actual);
            });
            res.json({
              max,
              actual,
              description,
              measure,
            })
          });
        });
});

router.get('/maxDailyFood', function(req, res, next) {
  let actual = 0;
  let max;
  let description;
  let measure;
  Alert
      .findById("5b293c2d40ed4627743a63ee")
      .exec(function(err, alert) {
        max = alert.value;
        description = alert.description;
        measure = alert.measure;
        console.log('max to jest :' + max);
        let startDate = new Date() 
        startDate.setDate(startDate.getDate()-1) 
        Event
            .find(
              {time_stop:{$gte: startDate},
                event_type:"food"})
            .exec(function(err, events) {
              console.log('alerts', events)
              arrToAdd = events.map((item)=>{
                actual += item.values[0]["value"]
                console.log('actual' + actual);
            });
            res.json({
              max,
              actual,
              description,
              measure,
            })
          });
        });
});

router.get('/maxDailyDrink', function(req, res, next) {
  let actual = 0;
  let max;
  let description;
  let measure;
  Alert
      .findById("5b293c4bed26a93d1887954c")
      .exec(function(err, alert) {
        max = alert.value;
        description = alert.description;
        measure = alert.measure;
        console.log('max to jest :' + max);
        let startDate = new Date();
        startDate.setDate(startDate.getDate()-1); 
        Event
            .find(
              {time_stop:{$gte: startDate},
                event_type:"drink"})
            .exec(function(err, events) {
              console.log('alerts', events)
              arrToAdd = events.map((item)=>{
                actual += item.values[0]["value"]
                console.log('actual' + actual);
            });
            res.json({
              max,
              actual,
              description,
              measure,
            })
          });
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