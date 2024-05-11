const mongoose = require('mongoose')
var Schema = mongoose.Schema;


const ProductModel = mongoose.model("Product", new Schema({
    cake_title: String,
    price: String,
    size: Array,
    img_src: Array,
    introduction: String,
    description: Array,
    inclustion: Array,
    categories: Array
}
))

module.exports = ProductModel