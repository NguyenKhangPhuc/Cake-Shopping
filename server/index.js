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

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://nguyenkhangphuc2005:1231232312123@shoppingdb.b1a0wet.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'test'
        });
        console.log(conn.connection.host)
    } catch (err) {
        console.log(err)
    }
}
connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 3000")
    })


    // app.listen(3000, () => {
    //     console.log("Server is running on port 3000")
    // })
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenkhangphuc2005@gmail.com',
        pass: 'eybfdaaclnqhwxms'
    }
});




app.get('/', async (req, res) => {
    await ProductModel.find({})
        .then((product) => {
            res.status(200).json(product)
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


app.post('/signup', async (req, res) => {
    const { username, signUpEmail, signUpPW, code } = req.body
    if (code == signUpCode) {
        await UserModel.findOne({ signUpEmail })
            .then(async user => {
                if (!user) {
                    await UserModel.create({
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


app.post('/login', async (req, res) => {
    let { signInEmail, signInPW } = req.body
    signInPW = md5Hash.default(signInPW)
    console.log(signInPW)
    await UserModel.findOne({ signUpEmail: signInEmail })
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
app.post('/make-list', async (req, res) => {
    const { id, list } = req.body
    await CartListModel.findOne({ id: id })
        .then(async (result) => {
            if (!result) {
                await CartListModel.create(req.body)
                    .then(user => { res.json(user) })
                    .catch(e => console.log(e))
            }
        })
})
app.post('/update-list', async (req, res) => {
    const { id, listStorage } = req.body
    await CartListModel.updateOne({ id: id }, { list: listStorage })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/get-list', async (req, res) => {
    const { id } = req.body
    await CartListModel.findOne({ id: id })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/update-cart', async (req, res) => {
    const { id, cartList } = req.body
    await CartListModel.updateOne({ id: id }, { list: cartList })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
})
app.post('/make-orders-list', async (req, res) => {
    const { id, orderList, name, age, phone, address } = req.body
    await OrderModel.create(req.body)
        .then(orders => res.json(orders))
        .catch(err => res.json(err))
})
app.post('/get-order-info', async (req, res) => {
    const { id } = req.body
    await OrderModel.find({ id: id })
        .then(orders =>
            res.json(orders)
        )
        .catch(err => res.json(err))
})

app.post('/find-email', async (req, res) => {
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
    await UserModel.findOne({ signUpEmail: email })
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
app.post('/change-pw', async (req, res) => {
    let { email, newPw } = req.body
    newPw = md5Hash.default(newPw)
    await UserModel.updateOne({ signUpEmail: email }, { signUpPW: newPw })
        .then((result) => {
            res.json(result)
        })
        .catch(err => console.log(err))
})