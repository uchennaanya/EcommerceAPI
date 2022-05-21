const Order = require("../models/Order")

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

const router = require('express').Router()

// Create Order

router.post('/createOrder', verifyToken, async (req, res)=> {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch (err) {
        res.status(500).json(err)
    }
})

// Update Cart

router.put("/updateOrder/:id", verifyTokenAndAdmin, async (req, res) => {

    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedOrder)

    } catch(err) {
        res.status(401).json("you cannot update this record!")
    }
})

// Delete Cart

router.delete('/deleteOrder/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order deleted")
    } catch(err){
        res.status(401).json(err)
    }
})

// Get An Order

router.get('/findProduct/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const anOder = await Order.find({userId: req.params.userId})

        res.status(200).json(anOder)
    } catch(err){
        res.status(401).json(err)
    }
})

// Get All Cart

router.get('/allCart', verifyTokenAndAdmin, async (req, res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch(err) {
        res.status(401).json(err)
    }
})

// Order Stats

router.get('/income', verifyTokenAndAdmin, async (req,res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
    try{
        const income = await Order.aggregate([
            { $match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ])
        res.status(200).json(income)
    }catch(err) {
        res.status(401).json(err)
    }
})

module.exports = router
