var express = require('express');
var router = express.Router();
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

// old URI 'mongodb://127.0.0.1:27017'
/* GET all Events. */
router.get('/', function(req, res, next) {
    Event
        .find({})
        .exec(function(err, events) {
        res.json(events);
     });
});

/* GET X no. of temperature events. */
router.get('/temperature', function(req, res, next) {
    console.log(req.query);
    Event
        .find({"event_type":"temperature"})
        .sort({time_stop:-1})
        .limit(parseInt(req.query.limit))
        .exec(function(err, events) {
        res.json(events);
     });
});

/* GET X no. of temperature events. */
router.get('/weight', function(req, res, next) {
    console.log(req.query);
    Event
        .find({"event_type":"weight"})
        .sort({time_stop:-1})
        .limit(parseInt(req.query.limit))
        .exec(function(err, events) {
        res.json(events);
     });
});

/* GET X no. of pressure events. */
router.get('/pressure', function(req, res, next) {
    console.log(req.query);
    Event
        .find({"event_type":"pressure"})
        .sort({time_stop:-1})
        .limit(parseInt(req.query.limit))
        .exec(function(err, events) {
        res.json(events);
     });
});

/* GET X no. of in events. */
router.get('/inEvents', function(req, res, next) {
    let d = new Date();
    d.setDate(d.getDate() - 30);
    let fromDate = d.toISOString();    
    Event
        .find({ $and: [{"event_category":"przyjecie"},{"time_stop": { $gte : fromDate }}] })
        .sort({time_stop:-1})
        .exec(function(err, events) {
        res.json(events);
     });
});

/* GET X no. of out events. */
router.get('/outEvents', function(req, res, next) {
    let d = new Date();
    d.setDate(d.getDate() - 30);
    let fromDate = d.toISOString();   
    Event
        .find({ $and: [{"event_category":"wydalenie"},{"time_stop": { $gte : fromDate }}] })
        .sort({time_stop:-1})
        .exec(function(err, events) {
        res.json(events);
     });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
	const newEvent = new Event(req.body);  
    newEvent.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).send(newEvent);
});
});
});

module.exports = router;