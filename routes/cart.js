const Cart = require("../models/Cart")

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

const router = require('express').Router()

// Create Cart

router.post('/addToCart', verifyToken, async (req, res)=> {
    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch (err) {
        res.status(500).json(err)
    }
})

// Update Cart

router.put("/updateCart/:id", verifyTokenAndAuthorization, async (req, res) => {

    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedCart)

    } catch(err) {
        res.status(401).json("you cannot update this record!")
    }
})

// Delete Cart

router.delete('/deleteCart/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Item removed from cart")
    } catch(err){
        res.status(401).json(err)
    }
})

// Get a User Cart

router.get('/findProduct/:userId', async (req, res) => {
    try {
        const aCart = await Cart.findOne({userId: req.params.userId})

        res.status(200).json(aCart)
    } catch(err){
        res.status(401).json(err)
    }
})

// Get All Cart

router.get('/allCart', verifyTokenAndAdmin, async (req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch(err) {
        res.status(401).json(err)
    }
})

module.exports = router
