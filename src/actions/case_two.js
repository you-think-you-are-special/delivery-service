module.exports = {
  /**
   * @param {String} str
   * @return {Promise<boolean>}
   */
  async validate (str) {
    return /^[A-Z](-[A-Z])+ ((repeat|maxCost|maxStops):[0-9]+ ){0,3}$/g.test(`${str} `)
  },
  /**
   * @param {string} paramsStr
   * @param {Graph} graph
   * @return {Promise<void>}
   */
  async run (paramsStr, { graph }) {
    const paramsArr = paramsStr.split(' ')
    const routeArr = paramsArr[0].split('-')
    const from = routeArr[0]
    const to = routeArr[1]

    let maxStops = Infinity
    const maxStopsStr = paramsArr.find(condition => condition.startsWith('maxStops:'))
    if (maxStopsStr) {
      maxStops = parseInt(maxStopsStr.replace('maxStops:', ''), 10)
    }

    let maxCost = Infinity
    const maxCostStr = paramsArr.find(condition => condition.startsWith('maxCost:'))
    if (maxCostStr) {
      maxCost = parseInt(maxCostStr.replace('maxCost:', ''), 10)
    }

    let repeat = 0
    const repeatStr = paramsArr.find(condition => condition.startsWith('repeat:'))
    if (maxCostStr) {
      repeat = parseInt(repeatStr.replace('repeat:', ''), 10)
    }

    const root = graph.getVertexByKey(from)
    if (!root) {
      console.warn(`No such town: ${from}`)
      return
    }

    const cnt = await root.countPaths(graph.getVertexByKey(routeArr[1]), {
      maxStops,
      maxCost,
      repeat,
    })
    console.info(`The number of possible delivery route from ${from} to ${to} with maxCost: ${maxCost}, maxStops: ${maxStops} and repeat: ${repeat} - ${cnt}`)
  },
}