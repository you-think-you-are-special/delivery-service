const { readFile } = require('fs');
const { promisify } = require('util');
const { deserialize } = require('v8');
const $get = require('lodash.get');

const readFileAsync = promisify(readFile);

class IndexDal {
  constructor() {

    /**
     * @private
     */
    this.cheapestCosts = {};
  }

  async load() {
    const buf = await readFileAsync(__dirname + '/../index/cheapest_costs.v8');
    this.cheapestCosts = deserialize(buf);
  }

  getCheapestCost(from, to, defaults) {
    return $get(this.cheapestCosts, [from, to], defaults);
  }
}

module.exports.IndexDal = IndexDal;