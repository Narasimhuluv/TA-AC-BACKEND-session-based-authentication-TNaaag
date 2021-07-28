var express = require('express');
var router = express.Router();
var User = require('../models/User')


/* GET users listing. */
router.get('/register', (req,res,next) => {
  res.render('register')
})

router.post('/register',(req,res,next)=> {
  User.create(req.body, (err,user) => {
    console.log(err,user);
    if(err) return next(err);
    res.redirect('/users/login')
  })
})

router.get('/login', (req,res,next) => {
  console.log(req.session)
  var error = req.flash('error')[0]
  res.render('login', {error})
})

router.get('/dashboard', (req,res,next) => {
  res.render('dashboard')
})

router.post('/login', (req,res,next) => {
  var {email , password} = req.body;
  if(!email || !password){
    req.flash('error','Email/Password are REquired')
   return res.redirect('/users/login');
  }
  User.findOne({email}, (err,user) => {
    if(err) return next(err);
    if(!user){
      req.flash('error', 'Enter Proper Details to go Dashboard')
      return res.redirect('/users/login')
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err);
      if(!result){
        req.flash('error', 'Details are Incorrect')
        return  res.redirect('/users/login')
      }
        req.session.userId = user.id;
        res.redirect('/users/dashboard')

    })
  })
})

router.get('/logout' , (req,res,next) => {
  console.log(req.session);
  req.session.destroy();
  res.clearCookie('connect.sid')
  res.redirect('/users/login')
})

module.exports = router;
