const { calcPathCost } = require('../utils/graph')

module.exports = {
  /**
   * @param {String} str
   * @return {Promise<boolean>}
   */
  async validate (str) {
    return /^[A-Z](-[A-Z])+$/g.test(str)
  },
  /**
   * @param {string} route
   * @param {Graph} graph
   * @return {Promise<void>}
   */
  async run (route, { graph }) {
    const routeArr = route.split('-')
    const cost = await calcPathCost(graph, routeArr)

    if (cost === null) {
      console.info('No Such Route')
      return
    }

    console.info(`The delivery cost for route ${route}: ${cost}`)
  },
}