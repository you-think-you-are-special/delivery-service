const { calcPathCost } = require('../utils/graph');

/**
 * @param {string} route
 * @param {Graph} graph
 */
module.exports = function (route, { graph }) {
  const routeArr = route.split('-');
  const cost = calcPathCost(graph, routeArr);

  if (cost === null) {
    console.info('No Such Route');
    return;
  }

  console.info(`The delivery cost for route ${route}: ${cost}`);
};