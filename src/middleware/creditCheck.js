const Credit = require('../models/CreditTransaction')

module.exports = async (req, res, next) => {
  try {
    const credit = await Credit.findOne({ userId: req.user.id })

    // If balance is 0, give grace credit and allow through
    if (!credit || credit.balance <= 0) {
      await Credit.findOneAndUpdate(
        { userId: req.user.id },
        { $set: { balance: 1 } },
        { upsert: true, new: true }
      )
      console.log(`Grace credit given to user ${req.user.id}`)
    }

    req.creditBalance = credit ? credit.balance : 1
    next()
  } catch (err) {
    return res.status(500).json({ error: 'Credit check failed' })
  }
}