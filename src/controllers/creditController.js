const { getBalance, addCredits, deductCredits } = require('../services/creditService')

const getCredits = async (req, res, next) => {
  try {
    const balance = await getBalance(req.user.id)
    res.status(200).json({ balance })
  } catch (err) {
    next(err)
  }
}

const topUpCredits = async (req, res, next) => {
  try {
    const { amount } = req.body
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' })
    }

    const credit = await addCredits(req.user.id, amount)
    res.status(200).json({ balance: credit.balance })
  } catch (err) {
    next(err)
  }
}

const spendCredits = async (req, res, next) => {
  try {
    const { amount } = req.body
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' })
    }

    const credit = await deductCredits(req.user.id, amount)
    res.status(200).json({ balance: credit.balance })
  } catch (err) {
    next(err)
  }
}

module.exports = { getCredits, topUpCredits, spendCredits }