module.exports = function ({vertices}, paramsStr) {
  this.clearBufferedCommand();
  const paramsArr = paramsStr.split(' ');
  const routeArr = paramsArr[0].split('-');

  let limit;
  if (paramsArr[1]) {
    limit = parseInt(paramsArr[1].replace('limit:', ''), 10);
  }

  /**
   * @type Vertex
   */
  const root = vertices[routeArr[0]];
  const cnt = root.countPaths(routeArr[1], {limit});
  console.info(`The number of possible delivery route from ${routeArr[0]} to ${routeArr[1]} with a maximum of ${limit} stop: ${cnt}`);

  this.displayPrompt();
};

