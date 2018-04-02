var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/Events')

/* GET all Events. */
router.get('/', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Event.find({}, function(err, events) {
        res.json({events: events});
     });
});


module.exports = router;