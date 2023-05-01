const initSeal = require('./config/seal_config')
const { saveFile, readFile } = require('./utils/fs_utils')
const { contextGenerator } = require('./utils/seal_utils')

const suite = {
  async generateKeys(fileNameP, fileNamePr, context) {
    try {
      const { sealInstance, encParms, securityLevel } = global.enc
      const keyGenerator = sealInstance.KeyGenerator(context)
      const publicKeyArray = keyGenerator.createPublicKey()
      const privateKeyArray = keyGenerator.secretKey()
      await saveFile(publicKeyArray.save(), fileNameP)
      await saveFile(privateKeyArray.save(), fileNamePr)
    } catch (e) {
      console.log(e)
    }
  },
  async encryptData(fileName, saveFileName, context) {
    try {
      const { sealInstance, encParms, securityLevel } = global.enc
      const publicKey = await readFile(fileName)
      const regeneratedPublicKey = sealInstance.PublicKey()
      regeneratedPublicKey.load(context, publicKey)
      const encoder = sealInstance.BatchEncoder(context)
      const encryptor = sealInstance.Encryptor(context, regeneratedPublicKey)
      const plainTextA = encoder.encode(
        Int32Array.from([1]) // This could also be a Uint32Array
      )
      console.time('ec-start')
      const cipherTextA = encryptor.encrypt(plainTextA)
      console.timeEnd('ec-start')
      await saveFile(cipherTextA.save(), saveFileName)
    } catch (e) {
      console.log(e)
    }
  },
  async evaluator(type, context) {
    const { sealInstance, encParms, securityLevel } = global.enc
    const add = async (context) => {
      try {
        const ec_one = await readFile('ec1')
        const ec_two = await readFile('ec2')
        const uploadedCipherTextO = sealInstance.CipherText()
        uploadedCipherTextO.load(context, ec_one)
        const uploadedCipherTextT = sealInstance.CipherText()
        uploadedCipherTextT.load(context, ec_two)
        const newTest = sealInstance.CipherText()
        const evaluator = sealInstance.Evaluator(context)
        await evaluator.add(uploadedCipherTextO, uploadedCipherTextT, newTest)
        await saveFile(newTest.save(), 'add')
        evaluator.delete()
      } catch (e) {
        console.log(e.message)
      }
    }
    const sub = async (context) => {
      try {
      } catch (e) {
        console.log(e.message)
      }
    }
    try {
      switch (type) {
        case 'add':
          await add(context)
          break
        case 'sub':
          await sub()
          break
        default:
          break
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  async decryptData(fileNamePr, saveFileName, context) {
    try {
      const { sealInstance } = global.enc
      const encryptedData = await readFile(saveFileName)
      console.log(encryptedData)
      const privateKey = await readFile(fileNamePr)
      console.log(privateKey)
      const uploadedCipherText = sealInstance.CipherText()
      uploadedCipherText.load(context, encryptedData)
      const regeneratedPrivateKey = sealInstance.SecretKey()
      regeneratedPrivateKey.load(context, privateKey)
      const encoder = sealInstance.BatchEncoder(context)
      const decryptor = sealInstance.Decryptor(context, regeneratedPrivateKey)
      console.time('dc-start')
      const plainTextD = decryptor.decrypt(uploadedCipherText)
      console.log(plainTextD)
      console.timeEnd('dc-start')
      const decoded = encoder.decode(plainTextD)
      console.log(decoded)
      // console.log([...decoded.slice(0, 3)])
    } catch (e) {
      console.log(e.message)
    }
  },
}
;(async () => {
  try {
    await initSeal()
    const context = await contextGenerator()
    // await suite.generateKeys('p1', 'pr1', context)
    // await suite.generateKeys('p2', 'pr2', context)
    // await suite.generateKeys('p3', 'pr3', context)
    // encrypt
    // await suite.encryptData('p1', 'ec1', context)
    // await suite.encryptData('p1', 'ec2', context)
    // await suite.encryptData('p1', 'ec3', context)
    // decrypt
    // await suite.decryptData('pr1', 'ec1', context)
    // await suite.decryptData('pr1', 'ec2', context)
    // await suite.decryptData('pr1', 'ec3', context)
    // add
    // await suite.evaluator('add', context)
    await suite.decryptData('pr1', 'add', context)
  } catch (e) {
    console.log(e.message)
  }
})()
