const { readFile, saveFile } = require('../utils/fs_utils')
const { contextGenerator } = require('../utils/seal_utils')
module.exports = {
  async generateKeys(req, res, next) {
    try {
      const context = await contextGenerator()
      const { sealInstance, encParms, securityLevel } = global.enc
      const keyGenerator = sealInstance.KeyGenerator(context)
      const publicKeyArray = keyGenerator.createPublicKey()
      const privateKeyArray = keyGenerator.secretKey()
      await saveFile(publicKeyArray.save(), 'publickey')
      await saveFile(privateKeyArray.save(), 'privateKey')
      res.status(200).send('done')
    } catch (e) {
      console.log(e)
    }
  },
  async encryptData(req, res, next) {
    try {
      const context = await contextGenerator()
      const { sealInstance, encParms, securityLevel } = global.enc
      const publicKey = await readFile('publickey')
      const regeneratedPublicKey = sealInstance.PublicKey()
      regeneratedPublicKey.load(context, publicKey)
      const encoder = sealInstance.BatchEncoder(context)
      const encryptor = sealInstance.Encryptor(context, regeneratedPublicKey)
      const plainTextA = encoder.encode(
        Int32Array.from([1, 2, 3]) // This could also be a Uint32Array
      )
      const cipherTextA = encryptor.encrypt(plainTextA)
      await saveFile(cipherTextA.save(), 'test')
      res.status(200).send('hello')
    } catch (e) {
      console.log(e)
    }
  },
  async decryptData(req, res, next) {
    try {
      const context = await contextGenerator()
      const { sealInstance } = global.enc
      const encryptedData = await readFile('test')
      const privateKey = await readFile('privateKey')
      const uploadedCipherText = sealInstance.CipherText()
      uploadedCipherText.load(context, encryptedData)
      const regeneratedPrivateKey = sealInstance.SecretKey()
      regeneratedPrivateKey.load(context, privateKey)
      const encoder = sealInstance.BatchEncoder(context)
      const decryptor = sealInstance.Decryptor(context, regeneratedPrivateKey)
      const plainTextD = decryptor.decrypt(uploadedCipherText)
      const decoded = encoder.decode(plainTextD)
      res.status(200).send({ data: [...decoded.slice(0, 3)] })
    } catch (e) {
      console.log(e.message)
    }
  },
}
