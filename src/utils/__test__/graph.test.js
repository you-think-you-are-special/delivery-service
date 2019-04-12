const { GraphVertex } = require('../../data_structures/graph_vertex')
const { GraphEdge } = require('../../data_structures/graph_edge')
const { Graph } = require('../../data_structures/graph')
const { calcCheapestCosts, calcPathCost } = require('../graph')

describe('graph', () => {
  [[['A', 'B', 'E'], 4], [['A', 'D'], 10], [['E', 'A', 'C', 'F'], 8], [['A', 'D', 'F'], null]]
    .forEach(([route, expected]) => {
      it(`should calcPathCost for route: ${route}`, async () => {
        const graph = createGraph()
        await expect(calcPathCost(graph, route)).resolves.toBe(expected)
      })
    });

  [[['E', 'D'], 9], [['E', 'E'], 6]]
    .forEach(([route, expected]) => {
      it(`should calcCheapestCosts for route: ${route}`, async () => {
        const graph = createGraph()
        const { costs } = calcCheapestCosts(graph, graph.getVertexByKey(route[0]))
        await expect(costs[route[1]]).toBe(expected)
      })
    });
})

function createGraph () {
  const graph = new Graph(true)
  const routes = ['AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1']

  routes.forEach((route) => {
    const vertexA = graph.getVertexByKey(route[0]) || new GraphVertex(route[0])
    const vertexB = graph.getVertexByKey(route[1]) || new GraphVertex(route[1])
    const edgeAB = new GraphEdge(vertexA, vertexB, parseInt(route.slice(2), 10))

    graph.addEdge(edgeAB)
  })

  return graph
}