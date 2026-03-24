const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  tier: { type: String, enum: ['A', 'B', 'C'], required: true },
  creditsAwarded: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  idempotencyKey: { type: String, unique: true, sparse: true },
  workerProcessed: { type: Boolean, default: false },
}, { timestamps: true })

paymentSchema.index({ userId: 1 })

module.exports = mongoose.model('Payment', paymentSchema)