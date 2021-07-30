var express = require('express')
var router = express.Router();
var Product = require('../models/Product')

router.get('/product/new', (req,res,next) => {
    res.render('addProductForm')
})

router.post('/product', (req,res,next) => {
    // console.log(req.body)
    Product.create(req.body, (err,product) => {
        console.log(err,product)
        if(err) return next(err);
        res.redirect('/admin/product')
    })
})

router.get('/product', (req,res,next) => {
    Product.find({}, (err,product) => {
        console.log(err, product)
        if(err) return next(err);
        res.render('allproducts', {products : product})
    })
})



// Edit and delete 

router.get('/:id', (req,res,next) => {
    let id = req.params.id;
    Product.findById(id,(err,product) => {
        if(err) return next(err)
        res.render('eachproduct', {products : product})
    })
})

router.get('/:id/edit', (req,res,next) => {
    let id = req.params.id;
    Product.findById(id, (err,product)=> {
        if(err) return next(err);
        res.render('updateproduct', {products : product})
    })
})

router.post('/:id', (req,res,next) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(id,req.body,(err,product) => {
        if(err) return next(err);
        res.redirect('/admin/' + id)
    })
})

router.get('/:id/delete', (req,res,next) => {
    let id = req.params.id;
    Product.findByIdAndDelete(id,(err,product) => {
        if(err) return next(err);
        res.redirect('/admin/product')
    })
})


// likes and dislikes 

// router.get('/product/likes', (req,res,next) => {
//     let id = req.params.id;
//     Product.findByIdAndUpdate(id, {$inc : {likes : 1}}, (err,product) => {
//         if(err) return next(err);
//         res.redirect('/admin/product')
//     })
// })
// router.get('/product/likes', (req,res,next) => {
//     let id = req.params.id;
//     Product.findByIdAndUpdate(id, {$inc : {likes : -1}}, (err,product) => {
//         if(err) return next(err);
//         res.redirect('/admin/product')
//     })
// })

module.exports = router;
