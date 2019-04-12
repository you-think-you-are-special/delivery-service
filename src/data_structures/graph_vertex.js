const util = require('util')
const setImmediatePromise = util.promisify(setImmediate)

class GraphVertex {
  /**
   * @param {*} value
   */
  constructor (value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value')
    }

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value
    this.edges = new Map()
  }

  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */
  addEdge (edge) {
    this.edges.set(edge.getKey(), edge)

    return this
  }

  /**
   * @param {GraphEdge} edge
   */
  deleteEdge (edge) {
    delete this.edges.delete(edge.getKey())
  }

  /**
   * @returns {GraphVertex[]}
   */
  getNeighbors () {
    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return Array.from(this.edges.values())
      .map(edge => edge.startVertex === this ? edge.endVertex : edge.startVertex)
  }

  /**
   * @return {GraphEdge[]}
   */
  getEdges () {
    return Array.from(this.edges.values())
  }

  /**
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge (requiredEdge) {
    return this.edges.has(requiredEdge.getKey())
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor (vertex) {
    return !!Array.from(this.edges.values())
      .find(edge => edge.startVertex === vertex || edge.endVertex === vertex)
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {(GraphEdge|null)}
   */
  findEdge (vertex) {
    return Array.from(this.edges.values())
      .find(edge => edge.startVertex === vertex || edge.endVertex === vertex) || null
  }

  /**
   * @returns {string}
   */
  getKey () {
    return this.value
  }

  /**
   * @return {GraphVertex}
   */
  deleteAllEdges () {
    this.getEdges().forEach(edge => this.deleteEdge(edge))

    return this
  }

  /**
   * @param {GraphVertex} to
   * @param {Number} limit
   * @param {Number} maxCost
   * @param {Number} repeat
   * @param {Number} stackLimit
   * @return {Number}
   */
  async countPaths (to, { maxStops = Infinity, maxCost = Infinity, repeat = 0, stackLimit = 30000 } = {}) {
    if (maxStops === 0 || maxCost <= 0) {
      return 0
    }

    let pathsCount = 0
    const stack = [{ repeatedCnt: 0, edges: this.getEdges(), maxStops, maxCost }]

    while (stack.length > 0) {
      const { repeatedCnt, edges, maxStops, maxCost } = stack.pop()

      if (stack.length >= stackLimit) {
        throw new Error(`Stack overflow. Limit: ${stackLimit}`)
      }

      if (maxStops === 0 || repeatedCnt > repeat) {
        continue
      }

      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]

        if (edge.weight >= maxCost) {
          continue
        }

        const { endVertex } = edge

        // route has found
        if (endVertex.value === to.value) {
          pathsCount += 1

          stack.push({
            repeatedCnt: repeatedCnt + 1,
            edges: endVertex.getEdges(),
            maxStops: maxStops - 1,
            maxCost: maxCost - edge.weight,
          })
          continue
        }

        stack.push({
          repeatedCnt,
          edges: endVertex.getEdges(),
          maxStops: maxStops - 1,
          maxCost: maxCost - edge.weight,
        })

        // we won't block event loop
        await setImmediatePromise()
      }
    }

    return pathsCount
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  toString (callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}

module.exports.GraphVertex = GraphVertex
