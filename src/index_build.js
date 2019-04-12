const path = require('path')
const { promisify } = require('util')
const { serialize } = require('v8')
const { readFileSync, writeFile } = require('fs')
const { Graph } = require('./data_structures/graph')
const { calcCheapestCosts } = require('./utils/graph')
const config = require('config')

const writeFileAsync = promisify(writeFile)
const routesPath = path.normalize(process.argv[2] || `${__dirname}/../routes.txt`)
const indexDirPath = path.normalize(config.indexPath || `${__dirname}/../index/`);

(async () => {
  const routesStr = readFileSync(routesPath).toString()
  const routes = parseRoutes(routesStr)
  const graph = Graph.create(routes, { isDirected: true })

  const cheapestCosts = graph
    .getAllVertices()
    .reduce((acc, vertex) => {
      acc[vertex.getKey()] = calcCheapestCosts(graph, vertex).costs
      return acc
    }, {})

  // It is better to store data in db. I use files for simplicity
  // @see: https://12factor.net/processes
  await Promise.all([
    save('cheapest_costs', cheapestCosts),
    save('routes', routes),
  ])

  console.info(`Index built successfully. Path: ${indexDirPath}`)
})()
  .catch(console.error)

async function save (fileName, data) {
  await writeFileAsync(`${indexDirPath}${fileName}.v8`, serialize(data))
}

function parseRoutes (str) {
  const routeRegExp = /^[A-Z]{2}[1-9][0-9]*/g
  const cleanRegExp = /[^A-Z0-9, ]/g

  return str
    .replace(cleanRegExp, '')
    .split(', ')
    .filter(route => route.search(routeRegExp) !== -1)
    .filter(route => route[0] !== route[1])
}
