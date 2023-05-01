const setupIPFS = async () => {
  try {
    const ipfsInstance = await import('ipfs-http-client')
    const orbitDBInstance = await import('orbit-db')
    const ipfsConnection = await ipfsInstance.create(
      '/ip4/127.0.0.1/tcp/5002/http'
    )
    const connection = await orbitDBInstance.default.createInstance(
      ipfsConnection
    )
    await connection.docs('test')
  } catch (e) {
    console.log(e.message)
  }
}

const addFile = async () => {
  try {
  } catch (e) {
    console.log(e.message)
  }
}
const removeFile = async () => {
  try {
  } catch (e) {
    console.log(e.message)
  }
}
const getFile = async () => {
  try {
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = { setupIPFS, addFile, removeFile, getFile }
