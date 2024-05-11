const mongoose = require('mongoose')

const CartListSchema = new mongoose.Schema({
    id: String,
    list: Array
})

const CartListModel = mongoose.model("Cart", CartListSchema)
module.exports = CartListModel