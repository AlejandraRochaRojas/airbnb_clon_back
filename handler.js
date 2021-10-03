const serverless = require('@vendia/serverless-express')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')

const routes = require('./src/index')
const db = require('./src/config/db')

// Configure DB
db.connect({
  auth: true,
  host: process.env.MONGO_HOST,
  db: process.env.MONGO_DB,
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS
})

app.use(cors({
  origin: '*'
}))

// Middlewares
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
app.use(bodyParser.json({ limit: '5mb' }))

app.all(['/', '/v1', '/ping', '/v1/ping'], (req, res, next) => {
  return res.status(200).json({
    message: 'AirbnbClon Backend'
  })
})

app.use('/v1', routes)

// Error Handler
app.use((err, req, res, next) => {
  if (err.err.name === 'CastError') {
    res.status(404).json({
      error: 'Not Found',
      status: 404,
      code: 'NOT_FOUND'
    })
  } else if (err.status === 500) {
    res.status(500).json({
      err: process.env.APP_ENV === 'development' ? err.err : null,
      status: err.status,
      code: err.code,
      message: 'Tenemos problemas con el servidor. Gracias por tu paciencia'
    })
  } else {
    res.status(err.status || 500).json({
      code: err.code,
      error: err.err,
      message: err.message
    })
  }
})

// 404 Resolution
app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found'
  })
})

module.exports.handler = serverless({
  app
})
