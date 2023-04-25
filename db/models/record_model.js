const { Schema } = require('mongoose')
const connection = require('../db_config')
const recordSchema = new Schema({
  ethAddress: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  condition: {
    type: String,
  },
  doctorName: {
    type: String,
  },
  prescription: {
    type: String,
  },
})

recordSchema.methods.saveRecord = async function (data) {
  try {
  } catch (e) {
    console.log(e.message)
  }
}
recordSchema.methods.fetchRecord = async function (query) {
  try {
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = connection.model('record', recordSchema)
