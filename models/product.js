var mongoose = require('mongoose')

var ProductSchema = new mongoose.Schema({
    name : String,
    image:String,
    description : String,
    seller : String,
    category : String,
    price : Number
})

module.exports = mongoose.model("Product", ProductSchema);
