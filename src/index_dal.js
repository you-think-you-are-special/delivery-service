const { readFile } = require('fs')
const { promisify } = require('util')
const { deserialize } = require('v8')
const path = require('path')
const config = require('config')
const $get = require('lodash.get')

const readFileAsync = promisify(readFile)
const indexDirPath = path.normalize(config.indexPath || `${__dirname}/../index/`)

class IndexDal {
  constructor () {
    /**
     * @private
     */
    this.cheapestCosts = {}
  }

  async load () {
    const buf = await readFileAsync(`${indexDirPath}cheapest_costs.v8`)
    this.cheapestCosts = deserialize(buf)
  }

  getCheapestCost (from, to, defaults) {
    return $get(this.cheapestCosts, [from, to], defaults)
  }
}

module.exports.IndexDal = IndexDal
