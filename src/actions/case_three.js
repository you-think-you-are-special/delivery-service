/**
 * @param {string} routeStr
 * @param {IndexDal} indexDal
 */
module.exports = function (routeStr, { indexDal }) {
  const cost = indexDal.getCheapestCost(routeStr.slice(0, 1), routeStr.slice(2, 3), 'No such route');
  console.info(`The delivery cost for route ${routeStr}: ${cost}`);
};
