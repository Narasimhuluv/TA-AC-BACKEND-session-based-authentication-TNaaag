let express = require('express')
let router = express.Router();

router.get('/', (req,res,next) => {
    console.log(req.session.isAdmin);
    if(req.session.isAdmin === 'true'){
        return res.render('adminHomePage')
    }else if(req.session.isAdmin === 'false'){
        return res.render('userHomePage')
    }else{
        return res.redirect('/users/login')
    }
})

module.exports = router;