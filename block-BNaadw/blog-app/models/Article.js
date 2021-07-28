var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var slugger = require('slug')
var articleSchema = new Schema({
    description : {type : String},
    title :{type : String}, 
    likes : {type : Number , default : 0},
    author : [{type : Schema.Types.ObjectId, ref : 'User'}],
    comments : [{type : Schema.Types.ObjectId, ref : 'Comment'}],
    slug : {type : String, unique : true}
})

articleSchema.pre('save', function (next) {
    this.slug = slugger(this.title);
    if (!this.likes) {
      this.likes = 0;
    }
    next();
  });

var Article = mongoose.model('Article', articleSchema)
module.exports = Article;