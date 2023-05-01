require('dotenv').config()
const http = require('http')
const app = require('./app')
const isProduction = process.env.NODE_ENV === 'production' ? true : false
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8000
const initSeal = require('./config/seal_config')
const { setupIPFS } = require('./utils/ipfs_utils')
const { setupWS } = require('./controller/ws_controller')

if (isProduction) {
  console.log('Prod Code here')
} else {
  const server = http.createServer(app)
  ;(async () => {
    try {
      await initSeal()
      global.dbInstance = global.dbInstance
        ? global.dbInstance
        : await setupIPFS()
    } catch (e) {
      console.log(e.message)
    }
  })()
  server.listen(port)
  server.on('listening', () => {
    console.log(`listening on ${port}`)
  })

  server.on('upgrade', async (req, socket, head) => {
    if (req.url.includes('/ws')) {
      const token = req.url.split('?token=')[1]
      const wss = await require('./controller/ws_controller').setupWS()
      wss.handleUpgrade(req, socket, head, (socket) => {
        socket.token = token
        wss.emit('connection', socket, req)
      })
    }
  })
  server.on('error', (e) => {
    console.log(e.message)
  })
}
