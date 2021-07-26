var express = require('express');
var router = express.Router();
let User = require('../models/User')

/* GET users listing. */
router.get('/register', (req,res,next) => {
  res.render('register')
})

router.post('/register', (req,res,next)=> {
  console.log(req.body)
  User.create(req.body, (err,user) => {
    console.log(err,user)
    // res.json(user)
  })
})

module.exports = router;
