const { registerUser, loginUser } = require('../services/userService')
const User = require('../models/User')

const register = async (req, res, next) => {
  try {
    const { email, password, tier } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const user = await registerUser(email, password, tier)
    res.status(201).json({ message: 'User registered successfully', userId: user._id })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const result = await loginUser(email, password)
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login, getProfile }