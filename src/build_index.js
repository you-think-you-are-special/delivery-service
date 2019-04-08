const path = require('path');
const { serialize, deserialize } = require('v8');
const { readFileSync, writeFileSync } = require('fs');
const { Graph } = require('./data_structures/graph');
const { GraphVertex } = require('./data_structures/graph_vertex');
const { GraphEdge } = require('./data_structures/graph_edge');
const { calcCheapestCosts } = require('./dijkstra');


const routesPath = path.normalize(process.argv[2] || `${__dirname}/../routes.txt`);
const indexPath = path.normalize(`${__dirname}/../index/costs.v8`);

(() => {
  const routesStr = readFileSync(routesPath).toString();
  const routes = parseRoutes(routesStr);

  const graph = new Graph(true);

  routes.forEach((route) => {
    const vertexA = graph.getVertexByKey(route[0]) || new GraphVertex(route[0]);
    const vertexB = graph.getVertexByKey(route[1]) || new GraphVertex(route[1]);
    const edgeAB = new GraphEdge(vertexA, vertexB, parseInt(route.slice(2), 10));

    graph.addEdge(edgeAB);
  });

  const index = graph
    .getAllVertices()
    .reduce((acc, vertex) => {
      acc[vertex.getKey()] = calcCheapestCosts(graph, vertex).costs;
      return acc;
    }, {});

  writeFileSync(indexPath, serialize(index));
  console.info(`Index built successfully. Path: ${indexPath}`);
})();

function parseRoutes(str) {
  const routeRegExp = /^[A-Z]{2}[1-9][0-9]*/g;
  const cleanRegExp = /[^A-Z0-9, ]/g;

  return str
    .replace(cleanRegExp, '')
    .split(', ')
    .filter(route => route.search(routeRegExp) !== -1);
}



