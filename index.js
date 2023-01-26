require('dotenv').config()
const http = require('http')
const app = require('./app')
const isProduction = process.env.NODE_ENV === 'production' ? true : false
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000
const { dbConnection } = require('./db/db_config')

if (isProduction) {
  console.log('Prod Code here')
} else {
  const server = http.createServer(app)
  global.db = global.db ? global.db : dbConnection(process.env.LOCAL_CONNECTION)
  server.listen(port)
  server.on('listening', () => {
    console.log(`listening on ${port}`)
  })
  server.on('connection', (e) => {
    console.log('Connected to' + e)
  })
  server.on('error', (e) => {
    console.log(e.message)
  })
}
