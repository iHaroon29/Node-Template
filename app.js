const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('cors')())
app.use(require('helmet')())
app.use(require('morgan')('tiny'))

// Invalid JSON Handler
app.use((err, req, res, next) => {
  if (err.status === 400) {
    return res
      .status(err.status)
      .send({ status: err.status, message: 'Invalid JSON format' })
  }
  return next(err)
})

// Valid Routes Handler
app.use(require('./routes/route_handler'))

// Invalid Routes Handler
app.use((err, req, res, next) => {
  res.status(404).json({
    name: 'Error',
    status: 404,
    message: 'Invalid Request',
    statusCode: 404,
  })
})

module.exports = app
