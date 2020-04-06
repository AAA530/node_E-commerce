var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name : String,
    description : String,
    seller : String,
    category : String,
    price : Number
})

module.exports = mongoose.model("Product", UserSchema);
