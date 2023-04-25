const fs = require('fs')
const saveFile = async (base64Url, fileName) => {
  try {
    const fsWrite = fs.createWriteStream(`./${fileName}.txt`)
    fsWrite.write(base64Url)
    fsWrite.end(() => {
      console.log(`Write Ended for ${fileName}`)
    })
  } catch (e) {
    console.log(e.message)
  }
}

const readFile = async (fileName) => {
  try {
    let data = ''
    const fsRead = fs.createReadStream(`./${fileName}.txt`)
    for await (const chunk of fsRead) {
      data += Buffer.from(chunk).toString()
    }
    return data
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = { saveFile, readFile }
