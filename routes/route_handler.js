const router = require('express').Router()
const {
  saveMedicalRecord,
  fetchMedicalRecord,
} = require('../controller/management_controller')
const {
  generateKeys,
  encryptData,
  decryptData,
} = require('../controller/seal_controller')
// Router code start

router.get('/keys', [generateKeys])
router.get('/encrypt', [encryptData])
router.get('/decrypt', [decryptData])

router.post('/record', [saveMedicalRecord])
router.get('/record?', [fetchMedicalRecord])

// Router code end

module.exports = router
