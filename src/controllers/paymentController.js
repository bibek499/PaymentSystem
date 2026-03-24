const { processPayment, getPaymentHistory } = require('../services/paymentService')

const makePayment = async (req, res, next) => {
  try {
    const { amount } = req.body
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' })
    }

    const result = await processPayment(req.user.id, amount)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

const paymentHistory = async (req, res, next) => {
  try {
    const history = await getPaymentHistory(req.user.id)
    res.status(200).json(history)
  } catch (err) {
    next(err)
  }
}

module.exports = { makePayment, paymentHistory }