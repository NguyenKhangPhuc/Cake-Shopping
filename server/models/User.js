const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    signUpEmail: String,
    signUpPW: String,
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel