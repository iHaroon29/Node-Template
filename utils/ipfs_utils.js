const setupIPFS = async () => {
  try {
    const ipfsInstance = await import('ipfs-core')
    const orbitDBInstance = await import('orbit-db')

    const ipfsConnection = await ipfsInstance.create({
      preload: { enabled: false },
      repo: './ipfs',
      EXPERIMENTAL: { pubsub: true },
      config: {
        Bootstrap: [],
        Addresses: { Swarm: [] },
      },
    })

    const connection = await orbitDBInstance.default.createInstance(
      ipfsConnection
    )
    return connection
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = setupIPFS
