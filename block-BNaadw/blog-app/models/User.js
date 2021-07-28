var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    firstName : {type : String},
    lastName : {type : String},
    email : {type : String, unique : true},
    password : {type : String, minlength : 5, required : true},
    fullName : {type : String},
    articles : [{type : Schema.Types.ObjectId, ref : 'Article'}],
    city : {type : String}

},{timestamps : true})

userSchema.pre('save', function(next) {
    this.fullName = `${this.firstName}  ${this.lastName}`;
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password, 10, (err,hashed) => {
            if(err) return next(err)
            this.password = hashed;
            return next();
        })
    }else{
        next();
    }
})

userSchema.methods.verifyPassword = function(password ,cb){
    bcrypt.compare(password, this.password,(err,result) => {
        return cb(err, result)
    })
}

var User = mongoose.model('User', userSchema)
module.exports = User;