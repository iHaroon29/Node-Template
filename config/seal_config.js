const seal = require('node-seal')

const initSeal = async () => {
  try {
    const sealInstance = await seal()
    const schemeType = sealInstance.SchemeType.bfv
    const securityLevel = sealInstance.SecurityLevel.tc128
    const polyModulusDegree = 4096
    const bitSizes = [36, 36, 37]
    const bitSize = 20
    const encParms = sealInstance.EncryptionParameters(schemeType)

    encParms.setPolyModulusDegree(polyModulusDegree)
    encParms.setCoeffModulus(
      sealInstance.CoeffModulus.Create(
        polyModulusDegree,
        Int32Array.from(bitSizes)
      )
    )
    encParms.setPlainModulus(
      sealInstance.PlainModulus.Batching(polyModulusDegree, bitSize)
    )
    global.enc = global.enc
      ? global.enc
      : { sealInstance, encParms, securityLevel }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = initSeal
