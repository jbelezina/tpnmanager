var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/Event');

/* GET all Events. */
router.get('/', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Event.find({}, function(err, events) {
        res.json(events);
     });
});

router.post('/', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    console.log(req.body);
	const newEvent = new Event(req.body);  
    newEvent.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).send(newEvent);
});
});


module.exports = router;