const { Server } = require('ws')
const clientMap = []
module.exports = {
  async setupWS() {
    try {
      const wss = new Server({ noServer: true, path: '/ws/feed' })
      wss.on('connection', async (socket) => {
        clientMap.push({ uniqueId: socket.token, socket })
        socket.send(JSON.stringify({ messageData: 'OK', responseType: 'ack' }))
        const data = socket.token
        socket.on('message', async (packet) => {
          try {
            const { messageData = null, requestType = null } = JSON.parse(
              packet.toString()
            )

            if (!requestType)
              return socket.send({ message: 'Invalid Request Type' })
            switch (requestType) {
              case 'notify': {
                const instance = await this.fetchUser(messageData.fromAddress)
                return instance.socket.send(
                  JSON.stringify({
                    messageData: {
                      ...messageData,
                      accessAddress: socket.token,
                    },
                    responseType: 'notify',
                  })
                )
              }
              case 'ack': {
                const instance = await this.fetchUser(messageData.toAddress)
                return instance.socket.send(
                  JSON.stringify({
                    messageData: { ...messageData },
                    responseType: 'ack',
                  })
                )
              }
              default: {
                return socket.send(JSON.stringify({ message: 'pong' }))
              }
            }
          } catch (e) {
            console.log(e.message)
          }
        })
        socket.on('close', () => {
          const instance = clientMap.find((node) => node.uniqueId === data)
          clientMap.splice(clientMap.indexOf(instance), 1)
        })
      })
      wss.on('close', () => {
        console.log('Connection Closed')
      })
      wss.on('error', (e) => {
        console.log(e.message)
      })
      return wss
    } catch (e) {
      console.log(e.message)
    }
  },
  async fetchUser(fromAddress) {
    try {
      console.log(clientMap, fromAddress)
      for (let i = 0; i < clientMap.length; i++) {
        if (clientMap[i].uniqueId === fromAddress.toLowerCase()) {
          console.log(clientMap[i])
          return clientMap[i]
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  },
}
