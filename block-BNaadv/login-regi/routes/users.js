var express = require('express');
var router = express.Router();
var User = require('../models/User')

/* GET users listing. */
router.get('/register', (req,res,next) => {
  res.render('register')
})

router.post('/register', (req,res,next) => {
  // console.log(req.body)
  User.create(req.body,(err,user) => {
    if(err) return res.redirect('/users/register')
    console.log(err,user);
    res.redirect('/users/login')
  })
})

router.get('/login', (req,res,next) => {
  var error = req.flash('error')[0]
  res.render('login',{ error })
  console.log(req.session)
})

router.get('/dashboard', (req,res,next) => {
  res.render('dashboard')
  console.log(req.session)
})

router.post('/login', (req,res,next )=> {
  let {email , password} = req.body;
  if(!email || !password) {
    req.flash('error', 'Email / Password is Required')
    return res.redirect('/users/login')
  }
  User.findOne({email}, (err,user) => {
    if(err) return next(err)
    if(!user){
      req.flash('error', 'Email is not registerd')
      return res.redirect('/users/login')
    }
    user.verifyPassword(password,(err,result) => {
      if(err) return next(err);
      if(!result){
        req.flash('error', 'try agian with correct details')
        return res.redirect('/users/login')
      }
      req.session.userId = user.id;
      res.redirect('/users/dashboard')
    })

  })
})

router.get('/dashboard/logout', (req,res,next) => {
  req.session.destroy();
  res.clearCookie('connect.sid')
  res.redirect('/users/login')
  console.log(req.session)
})

module.exports = router;
