const Credit = require('../models/CreditTransaction')

const getBalance = async (userId) => {
  const credit = await Credit.findOne({ userId })
  if (!credit) throw new Error('Credit account not found')
  return credit.balance
}

const addCredits = async (userId, amount) => {
  const credit = await Credit.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  )
  return credit
}

const deductCredits = async (userId, amount) => {
  const credit = await Credit.findOne({ userId })
  if (!credit || credit.balance < amount) {
    throw new Error('Insufficient credits')
  }
  credit.balance -= amount

  // If balance hits 0, automatically give 1 grace credit
   if (credit.balance === 0) {
    credit.balance = 1
    console.log(`Grace credit given to user ${userId}`)
  }
  
  await credit.save()
  return credit
}

module.exports = { getBalance, addCredits, deductCredits }