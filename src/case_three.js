module.exports = function ({route}, routeStr) {
  this.clearBufferedCommand();
  const routeArr = routeStr.split('-');

  if (routeStr[0] !== routeStr[1]) {
    const {cost} = route.path(routeArr[0], routeArr[1], {cost: true});
    console.info(`The delivery cost for route ${routeStr}: ${cost}`);
    this.displayPrompt();
    return;
  }

  this.displayPrompt();
};
