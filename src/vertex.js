class Vertex {
  /**
   * @param {String} value
   */
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    this.value = value;
    this.next = new Map();
    this.weights = new Map();
  }

  /**
   * @param {String} key
   * @returns {*}
   */
  getNextVertexByKey(key) {
    return this.next[key];
  }

  /**
   * @param {Vertex} vertex
   * @param {Number} weight
   */
  connectWith(vertex, weight) {
    this.next[vertex.value] = vertex;
    this.weights[vertex.value] = weight;
  }

  /**
   * @param {String} to
   * @param {Number} limit
   */
  countPaths(to, {limit = Infinity} = {}) {
    if (limit === 0) {
      return 0;
    }

    return Object.values(this.next)
      .reduce((acc, vertex) => {
        if (vertex.value !== to) {
          acc += vertex.countPaths(to, {limit: limit - 1})
        } else {
          acc += 1;
        }

        return acc;
      }, 0);
  }

  /**
   * @param {[]} path
   * @returns {Number|null}
   */
  calcPathCost(path) {
    if (this.value !== path[0]) {
      return null;
    }

    let cost = 0;

    /**
     * @type Vertex
     */
    let vertex = this;
    const p = path.slice(1);
    for (const value of p) {
      if (!vertex.weights[value]) {
        return null;
      }

      cost += vertex.weights[value];
      vertex = vertex.getNextVertexByKey(value);

      if (vertex.value !== value) {
        return null;
      }

      if (!vertex.next) {
        break
      }
    }

    return cost;
  }
}

module.exports.Vertex = Vertex;
