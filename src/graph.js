/**
 * As I understood, node-dijkstra library use array for priority queue
 * I would use a priority queue on top of min heap for better performance
 * Probably, all calculations could be done before application launching,
 * because of the small amount of data (English alphabet limitation + number of cities in Thailand)
 * In that case performance could be not so important.
 *
 * Also, we don't want to block the event loop at runtime in a more complex application.
 * So we should consider partition our calculations with setImmediate function.
 */

const DijkstraGraph = require('node-dijkstra');
const util = require('util');
const {readFile} = require('fs');
const {Vertex} = require('./vertex');
const readFileAsync = util.promisify(readFile);


function parseRoutes(str) {
  const routeRegExp = /^[A-Z]{2}[1-9][0-9]*/g;
  const cleanRegExp = /[^A-Z0-9, ]/g;

  return str
    .replace(cleanRegExp, '')
    .split(', ')
    .filter(route => route.search(routeRegExp) !== -1);
}

class Graph {
  constructor() {
    this.vertices = new Map();
    this.route = {};
  }

  async load() {
    const routesStr = (await readFileAsync(process.argv[2] || `${__dirname}/../routes.txt`)).toString();
    const routes = parseRoutes(routesStr);

    const {vertices} = this;
    const data = {};

    routes.forEach(route => {
      const cityFrom = route.slice(0, 1);
      const cityTo = route.slice(1, 2);

      const a = vertices[cityFrom] || new Vertex(cityFrom);
      const b = vertices[cityTo] || new Vertex(cityTo);

      if (!vertices[cityFrom]) {
        vertices[cityFrom] = a;
      }

      if (!vertices[cityTo]) {
        vertices[cityTo] = b;
      }

      const weight = parseInt(route.slice(2), 10);
      a.connectWith(b, weight);

      data[cityFrom] = data[cityFrom] || {};
      data[cityFrom][cityTo] = weight;
    });

    this.route = new DijkstraGraph(data);
  }
}

module.exports.Graph = Graph;

