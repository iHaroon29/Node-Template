require('dotenv').config()
const mongoose = require('mongoose')

const connection = mongoose.createConnection(process.env.LOCAL_CONNECTION)

connection.on('connected', () => {
  console.log('Successfully Connection to DB')
})
connection.on('error', (e) => {
  console.log(e.message)
})

module.exports = connection
