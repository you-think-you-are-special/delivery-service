const repl = require('repl');
const $curry = require('lodash.curry');
const {Graph} = require('./graph');
const caseOne = require('./case_one');
const caseTwo = require('./case_two');
const caseThree = require('./case_three');


function createReplServer() {
  console.info('\nWelcome to ​Delivery​ Service!');
  console.info('Type ".help" to continue\n');

  const replServer = repl.start({
    prompt: 'Delivery​ ​Service> ',
  });

  delete replServer.commands.save;
  delete replServer.commands.load;
  delete replServer.commands.editor;
  delete replServer.commands.break;

  return replServer;
}

(async function main() {
  const graph = new Graph();

  // Reading and preparing data from disc
  // It is better to pre calculate if that possible. Than do that in runtime
  await graph.load();

  const replServer = createReplServer();

  replServer.defineCommand('case1', {
    help: 'Calculate the delivery cost of the given delivery route. Example: ".case1 A-B-E"',
    action: $curry(caseOne)(graph)
  });

  replServer.defineCommand('case2', {
    help: 'Calculate the number of possible delivery route that can be construct by the given conditions. ' +
      'Example: ".case2 E-D limit:4"',
    action: $curry(caseTwo)(graph)
  });

  replServer.defineCommand('case3', {
    help: 'Calculate the cheapest delivery route between two town. Example: ".case3 E-D"',
    action: $curry(caseThree)(graph)
  });
})()
  .catch(console.error);
