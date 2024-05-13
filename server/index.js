const express = require('express')
const mongoose = require('mongoose')
const ProductModel = require('./models/Product')
const UserModel = require('./models/User')
const CartListModel = require('./models/Trolley')
const OrderModel = require('./models/OrderInfo')
const crypto = require('crypto')
var md5Hash = require("md5-hash")
var nodemailer = require('nodemailer');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let userCode
let signUpCode
let verifyCode

mongoose.connect('mongodb+srv://nguyenkhangphuc2005:1231232312123@shoppingdb.b1a0wet.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingDB')
app.listen(5000, () => {
    console.log("server is running")
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenkhangphuc2005@gmail.com',
        pass: 'eybfdaaclnqhwxms'
    }
});




app.get('/', (req, res) => {
    ProductModel.find({})
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/send-code', (req, res) => {
    signUpCode = crypto.randomInt(
        100000, 999999
    )
    const { signUpEmail } = req.body
    var mailOptions1 = {
        from: 'nguyenkhangphuc2005@gmail.com',
        to: `${signUpEmail}`,
        subject: 'Your sign up code is here',
        text: `${signUpCode}`
    };
    transporter.sendMail(mailOptions1, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
})


app.post('/signup', (req, res) => {
    const { username, signUpEmail, signUpPW, code } = req.body
    if (code == signUpCode) {
        UserModel.findOne({ signUpEmail })
            .then(user => {
                if (!user) {
                    UserModel.create({
                        ...req.body,
                        signUpPW: md5Hash.default(signUpPW)
                    })
                        .then(acc => { res.json(acc) })
                        .catch(err => console.log(err))
                } else {
                    res.json('Email already in use')
                }
            })
    } else {
        res.json('Wrong verification code')
    }
})


app.post('/login', (req, res) => {
    let { signInEmail, signInPW } = req.body
    signInPW = md5Hash.default(signInPW)
    console.log(signInPW)
    UserModel.findOne({ signUpEmail: signInEmail })
        .then(user => {
            if (user) {
                if (user.signUpPW == signInPW) {
                    res.json({ mssg: 'success', user })
                }
                else {
                    res.json('Wpw')
                }
            }
            else {
                res.json('not existed user')
            }
        })
})
app.post('/make-list', (req, res) => {
    const { id, list } = req.body
    CartListModel.findOne({ id: id })
        .then((result) => {
            if (!result) {
                CartListModel.create(req.body)
                    .then(user => { res.json(user) })
                    .catch(e => console.log(e))
            }
        })
})
app.post('/update-list', (req, res) => {
    const { id, listStorage } = req.body
    CartListModel.updateOne({ id: id }, { list: listStorage })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/get-list', (req, res) => {
    const { id } = req.body
    CartListModel.findOne({ id: id })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/update-cart', (req, res) => {
    const { id, cartList } = req.body
    CartListModel.updateOne({ id: id }, { list: cartList })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/make-orders-list', (req, res) => {
    const { id, orderList, name, age, phone, address } = req.body
    OrderModel.create(req.body)
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
})
app.post('/get-order-info', (req, res) => {
    const { id } = req.body
    OrderModel.find({ id: id })
        .then(orders =>
            res.json(orders)
        )
        .catch(err => res.json(err))
})

app.post('/find-email', (req, res) => {
    verifyCode = crypto.randomInt(
        100000, 999999
    )
    const { email } = req.body
    var mailOptions = {
        from: 'nguyenkhangphuc2005@gmail.com',
        to: `${email}`,
        subject: 'Your verify code is here',
        text: `${verifyCode}`
    };
    UserModel.findOne({ signUpEmail: email })
        .then(user => {
            if (!user) {
                res.json('Wrong email information')
            } else {
                res.json(user)
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        })
})
app.post('/check-verifyCode', (req, res) => {
    const { code } = req.body
    if (code == verifyCode) {
        res.json('success')
    } else {
        res.json('Wrong verification code')
    }
})
app.post('/change-pw', (req, res) => {
    let { email, newPw } = req.body
    newPw = md5Hash.default(newPw)
    UserModel.updateOne({ signUpEmail: email }, { signUpPW: newPw })
        .then((result) => {
            res.json(result)
        })
        .catch(err => console.log(err))
})