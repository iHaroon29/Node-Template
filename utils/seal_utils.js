module.exports = {
  async contextGenerator() {
    try {
      const { sealInstance, encParms, securityLevel } = global.enc
      const context = sealInstance.Context(encParms, true, securityLevel)
      if (!context.parametersSet()) {
        throw new Error(
          'Could not set the parameters in the given context. Please try different encryption parameters.'
        )
      }
      return context
    } catch (e) {
      console.log(e)
    }
  },
}
