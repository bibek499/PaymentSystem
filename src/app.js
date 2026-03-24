const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const paymentRoutes = require('./routes/paymentRoutes')
const creditRoutes = require('./routes/creditRoutes')
const authRoutes = require('./routes/authRoutes')          // ← add this
const errorHandler = require('./middleware/errorhandler')

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
})
app.use(limiter)

app.use('/api/payments', paymentRoutes)
app.use('/api/credits', creditRoutes)
app.use('/api/auth', authRoutes)                           // ← add this

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running!' })
})

app.use(errorHandler)

module.exports = app