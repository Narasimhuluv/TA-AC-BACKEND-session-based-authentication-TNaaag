var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name : {type : String},
    quantity : {type : Number},
    price : {type : Number},
    image : {type : String},
    likes : {type : Number , default : 0}
}, {timestamps : true})

var Product = mongoose.model('Product', productSchema)
module.exports = Product;