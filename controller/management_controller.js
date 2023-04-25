const record_model = require('../db/models/record_model')
const { encodeData, decodeData } = require('../utils/crypto_utils')

module.exports = {
  async saveMedicalRecord(req, res, next) {
    try {
      const {
        ethAddress,
        age,
        gender,
        condition,
        doctorName,
        prescription,
        bloodGroup,
      } = req.body
      const newRecord = await record_model.saveRecord({
        ethAddress,
        age,
        gender,
        condition,
        doctorName,
        prescription,
        bloodGroup,
      })
      const encodedId = await encodeData(newRecord._id.toString())
      res.status(200).send({ data: encodedId })
    } catch (e) {
      res.status(500).send({ message: e.message })
    }
  },
  async fetchMedicalRecord(req, res, next) {
    try {
      const { id } = req.query
      const decodedData = await decodeData(id)
      const record = await record_model.findRecord(decodedData)
      if (record.length === 0)
        return res.status(400).send({ message: 'Invalid ID' })
      return res.status(200).send(record)
    } catch (e) {
      res.status(500).send({ message: e.message })
    }
  },
}
