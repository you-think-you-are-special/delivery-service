const { PriorityQueue } = require('./data_structures/priority_queue');


function createObjectWithDefaults(value) {
  const obj = {};
  const proxy = new Proxy(obj, {
    get: function (obj, prop) {
      return prop in obj ?
        obj[prop] :
        value;
    },
  });

  return { proxy, orig: obj };
}

module.exports.calcCheapestCosts = function (graph, startVertex) {
  // Init helper variables that we will need for Dijkstra algorithm.
  const { proxy: costs, orig: costsResult } = createObjectWithDefaults(Infinity);
  const visitedVertices = {};
  const { proxy: previousVertices } = createObjectWithDefaults(null);
  const queue = new PriorityQueue();

  // We are already at the startVertex so the distance to it is zero.
  costs[startVertex.getKey()] = 0;

  // Init vertices queue.
  queue.add(startVertex, costs[startVertex.getKey()]);

  // Iterate over the priority queue of vertices until it is empty.
  while (!queue.isEmpty()) {
    // Fetch next closest vertex.
    const currentVertex = queue.poll();

    // Iterate over every unvisited neighbor of the current vertex.
    currentVertex.getNeighbors().forEach((neighbor) => {
      // Don't visit already visited vertices.
      if (!visitedVertices[neighbor.getKey()] || neighbor === startVertex) {
        // Update distances to every neighbor from current vertex.
        const edge = graph.findEdge(currentVertex, neighbor);

        const existingDistanceToNeighbor = costs[neighbor.getKey()] || Infinity;
        const distanceToNeighborFromCurrent = costs[currentVertex.getKey()] + edge.weight;

        // If we've found shorter path to the neighbor - update it.
        if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
          costs[neighbor.getKey()] = distanceToNeighborFromCurrent;

          // Change priority of the neighbor in a queue since it might have became closer.
          if (queue.hasValue(neighbor)) {
            queue.changePriority(neighbor, costs[neighbor.getKey()]);
          }

          // Remember previous closest vertex.
          previousVertices[neighbor.getKey()] = currentVertex;
        }

        // Add neighbor to the queue for further visiting.
        if (!queue.hasValue(neighbor)) {
          queue.add(neighbor, costs[neighbor.getKey()]);
        }
      }
    });

    // Add current vertex to visited ones to avoid visiting it again later.
    visitedVertices[currentVertex.getKey()] = currentVertex;
  }

  return { costs: costsResult };
};
