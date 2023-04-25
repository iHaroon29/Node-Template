const crypto = require('crypto')

module.exports = {
  async encodeData(data) {
    return Buffer.from(data).toString('hex')
  },
  async decodeData(data) {
    return Buffer.from(data).toString()
  },
  async nounceGenerator(length) {
    return crypto.randomBytes(length).toString('hex')
  },
}
