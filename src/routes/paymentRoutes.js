const express = require('express')
const router = express.Router()
const { makePayment, paymentHistory } = require('../controllers/paymentController')
const auth = require('../middleware/authMiddleware')
const creditCheck = require('../middleware/creditCheck')

router.post('/', auth, creditCheck, makePayment)
router.get('/history', auth, paymentHistory)

module.exports = router