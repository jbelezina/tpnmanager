var express = require('express');
var router = express.Router();
var Product = require('../models/Product')
var mongoose = require('mongoose');
var options =   {
    poolSize: 100,
    promiseLibrary: global.Promise
  }     
var mongodbUri = 'mongodb://127.0.0.1:27017';
mongoose.connect(mongodbUri, options, function(error){console.log(error)});
var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {
    
/* GET all Products. */
router.get('/', function(req, res, next) {
    Product.find({}, function(err, products) {
        res.json(products);
     });
});


router.delete('/:id', function(req, res, next) {
    console.log('params.id' + req.params.id)
    Product
      .findOneAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Deleted!'});
      });
});

/* GET all tpn products. */
router.get('/tpn', function(req, res, next) {
    Product.find({type:'tpn'}, function(err, products) {
        res.json(products);
     });
});

/* GET all tpn products in dropdown format. */
router.get('/tpn/dropdown', function(req, res, next) {
    Product.find({type:'tpn'}, function(err, products) {        
        let options = []        
        products.forEach(item=>{
            options.push({value:item.name, label:item.name})
        })
        res.json(options);
     });
});

/* GET all drip products. */
router.get('/drip', function(req, res, next) {
    Product.find({type:'drip'}, function(err, products) {
        res.json(products);
     });
});

/* GET all tpn products in dropdown format. */
router.get('/drip/dropdown', function(req, res, next) {
    Product.find({type:'drip'}, function(err, products) {
        let options = []
        products.forEach(item=>{
            options.push({value:item.name, label:item.name})
        })
        res.json(options);
     });
});

/* GET all food products. */
router.get('/food', function(req, res, next) {
    Product.find({type:'food'}, function(err, products) {
        res.json(products);
     });
});

/* GET all food products in dropdown format. */
router.get('/food/dropdown', function(req, res, next) {
    Product.find({type:'food'}, function(err, products) {
        let options = []
        products.forEach(item=>{
            options.push({value:item.name, label:item.name})
        })
        res.json(options);
     });
});

/* GET all drink products. */
router.get('/drink', function(req, res, next) {
    Product.find({type:'drink'}, function(err, products) {
        res.json(products);
     });
});

/* GET all drink products in dropdown format. */
router.get('/drink/dropdown', function(req, res, next) {
    Product.find({type:'drink'}, function(err, products) {
        let options = []
        products.forEach(item=>{
            options.push({value:item.name, label:item.name})
        })
        res.json(options);
     });
});

/* GET all drug products. */
router.get('/drug', function(req, res, next) {
    Product.find({type:'drug'}, function(err, products) {
        res.json(products);
     });
});

/* GET all drug products in dropdown format. */
router.get('/drug/dropdown', function(req, res, next) {
    Product.find({type:'drug'}, function(err, products) {
        let options = []
        products.forEach(item=>{
            options.push({value:item.name, label:item.name})
        })
        res.json(options);
     });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
	const newProduct = new Product(req.body);  
    newProduct.save(err => {  
    if (err) return res.status(500).send(err);
    return res.status(200).send(newProduct);
        });
    });
});


module.exports = router;