const express = require("express")
// const dotenv =
require('dotenv').config()
const mongoose = require("mongoose")
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const cors = require('cors')

// dotenv.config()

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected"))
.catch(err => console.log(err))

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("Welcome"))


app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)

const port = process.env.PORT ||8000

app.listen(port, () => console.log(`Server established on port ${port}`))
