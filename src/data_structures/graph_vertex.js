class GraphVertex {
  /**
   * @param {*} value
   */
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;
    this.edges = new Map();
  }

  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */
  addEdge(edge) {
    this.edges.set(edge.getKey(), edge);

    return this;
  }

  /**
   * @param {GraphEdge} edge
   */
  deleteEdge(edge) {
    delete this.edges.delete(edge.getKey());
  }

  /**
   * @returns {GraphVertex[]}
   */
  getNeighbors() {
    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return Array.from(this.edges.values())
      .map(edge => edge.startVertex === this ? edge.endVertex : edge.startVertex);
  }

  /**
   * @return {GraphEdge[]}
   */
  getEdges() {
    return Array.from(this.edges.values());
  }

  /**
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge) {
    return this.edges.has(requiredEdge.getKey());
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex) {
    return !!Array.from(this.edges.values())
      .find(edge => edge.startVertex === vertex || edge.endVertex === vertex);
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {(GraphEdge|null)}
   */
  findEdge(vertex) {
    return Array.from(this.edges.values())
      .find(edge => edge.startVertex === vertex || edge.endVertex === vertex) || null;
  }

  /**
   * @returns {string}
   */
  getKey() {
    return this.value;
  }

  /**
   * @return {GraphVertex}
   */
  deleteAllEdges() {
    this.getEdges().forEach(edge => this.deleteEdge(edge));

    return this;
  }

  /**
   * @param {String} to
   * @param {Number} limit
   */
  countPaths(to, { limit = Infinity } = {}) {
    if (limit === 0) {
      return 0;
    }

    return this.getEdges()
      .reduce((acc, edge) => {
        const vertex = edge.endVertex;
        if (vertex.value !== to) {
          acc += vertex.countPaths(to, { limit: limit - 1 });
        } else {
          acc += 1;
        }

        return acc;
      }, 0);
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

module.exports.GraphVertex = GraphVertex;