const repl = require('repl')
const fs = require('fs')
const path = require('path')
const config = require('config')
const { deserialize } = require('v8')
const { Graph } = require('./data_structures/graph')
const caseOne = require('./actions/case_one')
const caseTwo = require('./actions/case_two')
const caseThree = require('./actions/case_three')
const { IndexDal } = require('./index_dal')

const indexDirPath = path.normalize(config.indexPath || `${__dirname}/../index/`)

function createReplServer () {
  console.info('\nWelcome to ​Delivery​ Service!')
  console.info('Type ".help" to continue\n')

  const replServer = repl.start({
    prompt: 'Delivery​ ​Service> ',
  })

  delete replServer.commands.save
  delete replServer.commands.load
  delete replServer.commands.editor
  delete replServer.commands.break

  return replServer
}

/**
 * @param action
 * @param params
 * @return {Function}
 */
function runAction (action, params) {
  return function (route) {
    action.validate(route)
      .then(valid => {
        if (!valid) {
          console.warn('Command is invalid ')
          return
        }

        return action.run(route, params)
      })
      .catch(console.error)
      .then(() => this.displayPrompt())
  }
}

(async function main () {
  const routes = deserialize(fs.readFileSync(`${indexDirPath}routes.v8`))
  const graph = Graph.create(routes, { isDirected: true })
  const indexDal = new IndexDal()
  await indexDal.load()

  const replServer = createReplServer()

  replServer.defineCommand('case1', {
    help: 'Calculate the delivery cost of the given delivery route. Example: ".case1 A-B-E"',
    action: runAction(caseOne, { graph }),
  })

  replServer.defineCommand('case2', {
    help: 'Calculate the number of possible delivery route that can be construct by the given conditions. ' +
      'Example: ".case2 E-D limit:4"',
    action: runAction(caseTwo, { graph }),
  })

  replServer.defineCommand('case3', {
    help: 'Calculate the cheapest delivery route between two town. Example: ".case3 E-D"',
    action: runAction(caseThree, { indexDal }),
  })
})()
  .catch(e => {
    if (e.code === 'ENOENT') {
      console.error(`Can't find index. Did you try 'npm run build'?`)
      process.exit(1)
    }
    console.error(e)
  })
