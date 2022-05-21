const User = require("../models/User")

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

const router = require('express').Router()

router.put("/updateUser/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        return res.status(200).json(updatedUser)

    } catch(err) {
        res.status(401).json("you cannot update this record!")
    }
})

// Deleting a user

router.delete('/deleteUser/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch(err){
        res.status(401).json(err)
    }
})

// Get a user

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const aUser = await User.findById(req.params.id)
        const {password, ...others} = aUser._doc

        res.status(200).json(others)
    } catch(err){
        res.status(401).json(err)
    }
})

router.get('/findAll', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new ? await User.find().sort({_id: -1}).limit(5) : await User.find()
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(err){
        res.status(401).json(err)
    }
})

// Get User Stat

router.get('/stats', async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.getFullYear(date.getFullYear() - 1))
    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {
                month: {
                    $month: "$createdAt"
                }
            }},
            {$group: {
                _id: "$month",
                total: {$sum: 1}
            }}
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(401).json(err)
    }
})

module.exports = router
