const record = artifacts.require('MedicalRecord')
const key = artifacts.require('UserKey')
module.exports = function (deployer) {
  deployer.deploy(record)
  deployer.deploy(key)
}
