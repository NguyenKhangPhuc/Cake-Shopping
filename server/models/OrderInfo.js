const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    id: String,
    orderList: Array,
    name: String,
    age: String,
    phone: String,
    address: String,
    totalPrice: Number
})

const OrderModel = mongoose.model("Orders", OrderSchema)
module.exports = OrderModel