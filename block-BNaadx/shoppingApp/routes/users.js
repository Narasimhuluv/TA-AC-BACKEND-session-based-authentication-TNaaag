var express = require('express');
var router = express.Router();
var User = require('../models/User')

/* GET users listing. */
router.get('/new', (req,res,next) => {
  res.render('register')
})

router.post('/new', (req,res,next) => {
  console.log(req.body)
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.redirect('/users/login')
  })
})


//  login 

router.get('/login', (req,res,next)=> {
  var error = req.flash('error')[0]
  console.log(req.session)
  res.render('login', {error : error})
})

router.post('/login', (req,res,next) => {
  var {email ,  password} = req.body;
  if(!email || !password){
    req.flash('error', 'Email and Password is Required')
   return   res.redirect('/users/login')
  }
  User.findOne({email}, (err,user) => {
    if(err) return next(err);
    if(!user){
      req.flash('error', 'Email is not registerd')
     return   res.redirect('/users/login')
    }
    user.verifyPassword(password, (err, result) => {
      if(err) return next(err);
      if(!result){
        req.flash('error', 'Email is not registerd')
       return  res.redirect('/users/login')
      }
      else{
        console.log(req.session)
        req.session.userid = user.id;
        req.session.isAdmin = user.isAdmin;
       return res.redirect('/dashboard')
      }

    })
  })
})
// router.get('/dashboard', (req,res, next) => {
//   res.render('dashboard')
// } )

router.get('/logout', (req,res,next) => {
  console.log(req.session)
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/users/login')
  
})

module.exports = router;
