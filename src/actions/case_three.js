module.exports = {
  /**
   * @param {String} str
   * @return {Promise<boolean>}
   */
  async validate (str) {
    return /^[A-Z]-[A-Z]$/g.test(str)
  },
  /**
   * @param {string} routeStr
   * @param {IndexDal} indexDal
   * @return {Promise<void>}
   */
  async run (routeStr, { indexDal }) {
    const cost = indexDal.getCheapestCost(routeStr.slice(0, 1), routeStr.slice(2, 3), 'No such route')
    console.info(`The delivery cost for route ${routeStr}: ${cost}`)
  },
}