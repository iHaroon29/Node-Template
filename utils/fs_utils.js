const fs = require('fs')
const csv = require('csv-parser')

const saveFile = async (base64Url, fileName) => {
  try {
    const fsWrite = fs.createWriteStream(`./${fileName}`)
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
    const fsRead = fs.createReadStream(`./${fileName}`)
    for await (const chunk of fsRead) {
      data += Buffer.from(chunk).toString()
    }
    return data
  } catch (e) {
    console.log(e.message)
  }
}

const read_csv = async (fileName) => {
  try {
    let data = []
    const readStream = fs.createReadStream(fileName, {
      encoding: 'utf-8',
    })

    for await (const chunks of readStream.pipe(csv())) {
      data.push(chunks)
    }
    readStream.on('end', () => {
      console.log('Reading Ended')
    })
    readStream.on('error', (e) => {
      console.log(e.message)
    })

    return data
  } catch (e) {
    console.log(e.message)
  }
}

const processing = async (data) => {
  console.log(data)
  if (parseInt(data)) {
    return parseInt(data)
  } else {
    return data
  }
}
module.exports = { saveFile, readFile, read_csv, processing }
