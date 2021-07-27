var express = require('express');
var router = express.Router();
let User = require('../models/User')
var session = require('express-session')


/* GET users listing. */
router.get('/dashboard', (req,res,next) => {
  res.render('dashboard')
})
router.get('/register', (req,res,next) => {
  var error = req.flash('error')[0]
  res.render('register', {error})
})

router.post('/register', (req,res,next)=> {
  console.log(req.body)
  User.create(req.body, (err,user) => {
    console.log(err,user)
    // res.json(user)
    if(err){
        if(err.name === 'MongoError'){
          req.flash('error', 'This Email is Already in Use')
          return res.redirect('/users/register')
        }
        if(err.name === 'ValidationError'){
          req.flash('error', err.message);
          return res.redirect('/users/register')
        }
    }
    res.redirect('/users/login')
  })
})


router.get('/login', (req,res,next) => {
  var error = req.flash('error')[0];
  console.log(error);
  res.render('login', { error })
})

router.post('/login', (req,res,next) => {
  let {email , password} = req.body;
  if(!email || !password){
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
      console.log(err,result)
      // persist logged in user information
      
      req.session.userId = user.id;
      console.log(req.session, "session are displaying");
      res.redirect('/users/dashboard')
    })

    
  })
  
})

module.exports = router;
