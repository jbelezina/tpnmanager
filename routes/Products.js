var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product')

/* GET all Products. */
router.get('/', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Product.find({}, function(err, products) {
        res.json(products);
     });
});

/* GET all tpn products. */
router.get('/tpn', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Product.find({type:'tpn'}, function(err, products) {
        res.json(products);
     });
});

/* GET all drip products. */
router.get('/drip', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Product.find({type:'drip'}, function(err, products) {
        res.json(products);
     });
});

/* GET all food products. */
router.get('/food', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Product.find({type:'food'}, function(err, products) {
        res.json(products);
     });
});

/* GET all drink products. */
router.get('/drink', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Product.find({type:'drink'}, function(err, products) {
        res.json(products);
     });
});

/* GET all drink products. */
router.get('/drug', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    Product.find({type:'drug'}, function(err, products) {
        res.json(products);
     });
});

router.post('/', function(req, res, next) {
    mongoose.connect('mongodb://127.0.0.1:27017/');
    console.log(req.body);
	const newProduct = new Product(req.body);  
    newProduct.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).send(newProduct);
});
});


module.exports = router;