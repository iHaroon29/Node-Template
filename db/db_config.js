const mongoose = require('mongoose')

module.exports = {
  dbConnection(url) {
    const connection = mongoose.createConnection(url)
    connection.on('connected', () => {
      console.log('Successfully Connection to DB')
    })
    connection.on('error', (e) => {
      console.log(e.message)
    })
    return connection
  },
}
