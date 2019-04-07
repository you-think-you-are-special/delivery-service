module.exports = function ({vertices}, route) {
  this.clearBufferedCommand();

  const routeArr = route.split('-');
  const root = vertices[routeArr[0]];

  if (!root) {
    console.info('No Such Route');
    this.displayPrompt();
    return;
  }

  const cost = root.calcPathCost(routeArr);

  if (cost === null) {
    console.info('No Such Route');
    this.displayPrompt();
    return;
  }

  console.info(`The delivery cost for route ${route}: ${cost}`);
  this.displayPrompt();
};
