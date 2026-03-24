const express = require('express')
const router = express.Router()
const { getCredits, topUpCredits, spendCredits } = require('../controllers/creditController')
const auth = require('../middleware/authMiddleware')
const creditCheck = require('../middleware/creditCheck')

router.get('/', auth, getCredits)
router.post('/topup', auth, topUpCredits)
router.post('/spend', auth, creditCheck, spendCredits)

module.exports = router