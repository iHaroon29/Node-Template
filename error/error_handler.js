class CustomErrorHandler extends Error {
  constructor() {
    super()
    this.name = this.construstor.name
    if (this instanceof InvalidRoute) {
      this.type = 'Invalid Route'
      this.statusCode = 404
      this.message = 'Route not available!'
    } else if (this instanceof InvalidJSON) {
      this.type = 'Invalid Body format'
      this.status = 400
      this.message = 'Invalid Body format'
    }
  }
}

class InvalidRoute extends CustomErrorHandler {}
class InvalidJSON extends CustomErrorHandler {}

module.exports = { InvalidJSON, InvalidRoute }
