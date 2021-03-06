const util = require('util')
const { PriorityQueue } = require('../data_structures/priority_queue')

const setImmediatePromise = util.promisify(setImmediate)

function createObjectWithDefaults (value) {
  const obj = {}
  const proxy = new Proxy(obj, {
    get: function (obj, prop) {
      return prop in obj
        ? obj[prop]
        : value
    }
  })

  return { proxy, orig: obj }
}

/**
 * Dijkstra algorithm adaptation
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @returns {{costs}}
 */
module.exports.calcCheapestCosts = (graph, startVertex) => {
  // Init helper variables that we will need for Dijkstra algorithm.
  const { proxy: costs, orig: costsResult } = createObjectWithDefaults(Infinity)
  const visitedVertices = {}
  const { proxy: previousVertices } = createObjectWithDefaults(null)
  const queue = new PriorityQueue()

  // We are already at the startVertex so the distance to it is zero.
  costs[startVertex.getKey()] = 0

  // Init vertices queue.
  queue.add(startVertex, costs[startVertex.getKey()])

  // Iterate over the priority queue of vertices until it is empty.
  while (!queue.isEmpty()) {
    // Fetch next closest vertex.
    const currentVertex = queue.poll()

    // Iterate over every unvisited neighbor of the current vertex.
    currentVertex.getNeighbors().forEach((neighbor) => {
      // Don't visit already visited vertices.
      if (!visitedVertices[neighbor.getKey()] || neighbor === startVertex) {
        // Update distances to every neighbor from current vertex.
        const edge = graph.findEdge(currentVertex, neighbor)

        const existingDistanceToNeighbor = costs[neighbor.getKey()] || Infinity
        const distanceToNeighborFromCurrent = costs[currentVertex.getKey()] + edge.weight

        // If we've found shorter path to the neighbor - update it.
        if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
          costs[neighbor.getKey()] = distanceToNeighborFromCurrent

          // Change priority of the neighbor in a queue since it might have became closer.
          if (queue.hasValue(neighbor)) {
            queue.changePriority(neighbor, costs[neighbor.getKey()])
          }

          // Remember previous closest vertex.
          previousVertices[neighbor.getKey()] = currentVertex
        }

        // Add neighbor to the queue for further visiting.
        if (!queue.hasValue(neighbor)) {
          queue.add(neighbor, costs[neighbor.getKey()])
        }
      }
    })

    // Add current vertex to visited ones to avoid visiting it again later.
    visitedVertices[currentVertex.getKey()] = currentVertex
  }

  return { costs: costsResult }
}

/**
 * @param {Graph} graph
 * @param {[string]} path
 * @return {number|null}
 */
module.exports.calcPathCost = async (graph, path) => {
  let cost = 0

  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    const vertex = graph.getVertexByKey(key)
    if (!vertex) {
      return null
    }

    const edge = vertex.findEdge(graph.getVertexByKey(path[i + 1]))
    if (!edge) {
      return null
    }

    cost += edge.weight
    // we won't block event loop
    await setImmediatePromise()
  }

  return cost
}
