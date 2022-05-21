const Product = require("../models/Product")

const { verifyTokenAndAdmin} = require("./verifyToken")

const router = require('express').Router()

// Create Product

router.post('/createProduct', verifyTokenAndAdmin, async (req, res)=> {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }catch (err) {
        res.status(500).json(err)
    }
})

// Update Product

router.put("/updateProduct/:id", verifyTokenAndAdmin, async (req, res) => {

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedProduct)

    } catch(err) {
        res.status(401).json("you cannot update this record!")
    }
})

// Delete Product

router.delete('/deleteProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch(err){
        res.status(401).json(err)
    }
})

// Get a Product

router.get('/findProduct/:id', async (req, res) => {
    try {
        const aProduct = await Product.findById(req.params.id)

        res.status(200).json(aProduct)
    } catch(err){
        res.status(401).json(err)
    }
})

router.get('/allProduct', async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category

    try {
        let products
        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(1)
        } else if (qCategory) {
            products = await Product.find({
                categories:{
                    $in: [qCategory]
                }
            })
        } else {
           products = await Product.find()
        }
        res.status(200).json(products)
    } catch(err){
        res.status(401).json(err)
    }
})

module.exports = router
