var express = require('express');
var router = express.Router();
let User = require('../models/User')

/* GET users listing. */
router.get('/dashboard', (req,res,next) => {
  res.render('dashboard')
})
router.get('/register', (req,res,next) => {
  res.render('register')
})

router.post('/register', (req,res,next)=> {
  console.log(req.body)
  User.create(req.body, (err,user) => {
    console.log(err,user)
    // res.json(user)
    res.redirect('/users/login')
  })
})

router.get('/login', (req,res,next) => {
  res.render('login')
})

router.post('/login', (req,res,next) => {
  let {email , password} = req.body;
  if(!email || !password){
    return res.redirect('/users/login')
  }
  User.findOne({email}, (err,user) => {
    if(err) return next(err)
    if(!user){
      return res.redirect('/users/login')
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err);
      if(!result){
        return res.redirect('/users/login')
      }
      console.log(err,result)
    })
    req.session.userId = user.id;
      res.redirect('/users/dashboard')
  })
  
})

module.exports = router;
