const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  tier: { type: String, enum: ['A', 'B', 'C'], required: true, default: 'A' },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)