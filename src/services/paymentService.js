const Payment = require('../models/Payment')
const User = require('../models/User')
const { addCredits } = require('./creditService')
const { TIER_MULTIPLIERS } = require('../config/tiers')
const crypto = require('crypto')

const processPayment = async (userId, amount) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  if (user.isBlocked) throw new Error('User is blocked')

  const tier = user.tier
  const multiplier = TIER_MULTIPLIERS[tier]  // ← this line was missing
  const creditsToAward = Math.floor(amount * multiplier)

  const idempotencyKey = crypto.randomUUID()

  const payment = await Payment.create({
    userId,
    amount,
    tier,
    creditsAwarded: creditsToAward,
    status: 'completed',
    idempotencyKey,
    workerProcessed: false,
  })

  await addCredits(userId, creditsToAward)

  payment.workerProcessed = true
  await payment.save()

  return {
    success: true,
    creditsAwarded: creditsToAward,
    tier,
    multiplier,
    paymentId: payment._id,
  }
}

const getPaymentHistory = async (userId) => {
  return await Payment.find({ userId }).sort({ createdAt: -1 })
}

module.exports = { processPayment, getPaymentHistory }