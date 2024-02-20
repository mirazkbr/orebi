const express = require('express')
const router = express.Router()
const authRouter = require('./authentication.js')
const categoryRouter = require('./category.js')
const merchantRouter = require('./merchant')
const productRouter = require('./product')

router.use('/authentication', authRouter)
router.use('/category', categoryRouter)
router.use('/marchent', merchantRouter)
router.use('/products', productRouter)

module.exports = router;