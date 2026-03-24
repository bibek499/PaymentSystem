const User = require('../models/User')
const Credit = require('../models/CreditTransaction')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (email, password, tier = 'A') => {
  const existing = await User.findOne({ email })
  if (existing) throw new Error('Email already registered')

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashed, tier })

  await Credit.create({ userId: user._id, balance: 1 })

  return user
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid credentials')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Invalid credentials')

  const token = jwt.sign(
    { id: user._id, email: user.email, tier: user.tier },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return { token, user: { id: user._id, email: user.email, tier: user.tier } }
}

module.exports = { registerUser, loginUser }