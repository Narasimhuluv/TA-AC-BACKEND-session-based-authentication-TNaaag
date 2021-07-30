let express = require('express');
let router = express.Router();
let Product = require('../models/Product')


router.get('/product', (req,res,next) => {
    Product.find({}, (err,product) => {
        console.log(err, product)
        if(err) return next(err);
        res.render('clientallproducts', {products : product})
    })
})


router.get('/:id', (req,res,next) => {
    let id = req.params.id;
    Product.findById(id,(err,product) => {
        if(err) return next(err)
        res.render('clienteachproduct', {products : product})
    })
})


router.get('/:id/likes', (req,res,next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc : {likes : 1}}, (err,product) => {
        if(err) return next(err);
        res.redirect('/client/' + id)
    })
})
router.get('/:id/dislikes', (req,res,next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id, {$inc : {likes : -1 }}, (err,product) => {
        console.log(product)
        if(err) return next(err);
        res.redirect('/client/' + id)
    })
})
module.exports = router;