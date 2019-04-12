const { GraphVertex } = require('../graph_vertex');
const { GraphEdge } = require('../graph_edge');

describe('GraphVertex', () => {
  it('should throw an error when trying to create vertex without value', () => {
    let vertex = null;

    function createEmptyVertex() {
      vertex = new GraphVertex();
    }

    expect(vertex).toBeNull();
    expect(createEmptyVertex).toThrow();
  });

  it('should create graph vertex', () => {
    const vertex = new GraphVertex('A');

    expect(vertex).toBeDefined();
    expect(vertex.value).toBe('A');
    expect(vertex.toString()).toBe('A');
    expect(vertex.getKey()).toBe('A');
    expect(vertex.getEdges()).toEqual([]);
  });

  it('should add edges to vertex and check if it exists', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.hasEdge(edgeAB)).toBe(true);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);
    expect(vertexA.getEdges().length).toBe(1);
    expect(vertexA.getEdges()[0].toString()).toBe('A_B');
  });

  it('should delete edges from vertex', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    expect(vertexA.hasEdge(edgeAB)).toBe(true);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);

    expect(vertexA.hasEdge(edgeAC)).toBe(true);
    expect(vertexC.hasEdge(edgeAC)).toBe(false);

    expect(vertexA.getEdges().length).toBe(2);

    expect(vertexA.getEdges()[0].toString()).toBe('A_B');
    expect(vertexA.getEdges()[1].toString()).toBe('A_C');

    vertexA.deleteEdge(edgeAB);
    expect(vertexA.hasEdge(edgeAB)).toBe(false);
    expect(vertexA.hasEdge(edgeAC)).toBe(true);
    expect(vertexA.getEdges()[0].toString()).toBe('A_C');

    vertexA.deleteEdge(edgeAC);
    expect(vertexA.hasEdge(edgeAB)).toBe(false);
    expect(vertexA.hasEdge(edgeAC)).toBe(false);
    expect(vertexA.getEdges().length).toBe(0);
  });

  it('should delete all edges from vertex', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    expect(vertexA.hasEdge(edgeAB)).toBe(true);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);

    expect(vertexA.hasEdge(edgeAC)).toBe(true);
    expect(vertexC.hasEdge(edgeAC)).toBe(false);

    expect(vertexA.getEdges().length).toBe(2);

    vertexA.deleteAllEdges();

    expect(vertexA.hasEdge(edgeAB)).toBe(false);
    expect(vertexB.hasEdge(edgeAB)).toBe(false);

    expect(vertexA.hasEdge(edgeAC)).toBe(false);
    expect(vertexC.hasEdge(edgeAC)).toBe(false);

    expect(vertexA.getEdges().length).toBe(0);
  });

  it('should return vertex neighbors in case if current node is start one', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    expect(vertexB.getNeighbors()).toEqual([]);

    const neighbors = vertexA.getNeighbors();

    expect(neighbors.length).toBe(2);
    expect(neighbors[0]).toEqual(vertexB);
    expect(neighbors[1]).toEqual(vertexC);
  });

  it('should return vertex neighbors in case if current node is end one', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeBA = new GraphEdge(vertexB, vertexA);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    vertexA
      .addEdge(edgeBA)
      .addEdge(edgeCA);

    expect(vertexB.getNeighbors()).toEqual([]);

    const neighbors = vertexA.getNeighbors();

    expect(neighbors.length).toBe(2);
    expect(neighbors[0]).toEqual(vertexB);
    expect(neighbors[1]).toEqual(vertexC);
  });

  it('should check if vertex has specific neighbor', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.hasNeighbor(vertexB)).toBe(true);
    expect(vertexA.hasNeighbor(vertexC)).toBe(false);
  });

  it('should edge by vertex', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.findEdge(vertexB)).toEqual(edgeAB);
    expect(vertexA.findEdge(vertexC)).toBeNull();
  });

  it('should count paths with maxStops', async () => {
    const { vertexE, vertexD } = genVertices();
    await expect(vertexE.countPaths(vertexD, { maxStops: 4 })).resolves.toBe(4);
  });

  it('should count paths without params', async () => {
    const { vertexE } = genVertices();
    await expect(vertexE.countPaths(vertexE)).resolves.toBe(5);
  });

  it('should count paths with maxCost', async () => {
    const { vertexE } = genVertices();
    await expect(vertexE.countPaths(vertexE, { maxCost: 20, repeat: 2 })).resolves.toBe(29);
  });
});

function genVertices() {
  const vertexA = new GraphVertex('A');
  const vertexB = new GraphVertex('B');
  const vertexC = new GraphVertex('C');
  const vertexD = new GraphVertex('D');
  const vertexE = new GraphVertex('E');
  const vertexF = new GraphVertex('F');

  const edgeAB = new GraphEdge(vertexA, vertexB, 1);
  const edgeAC = new GraphEdge(vertexA, vertexC, 4);
  const edgeAD = new GraphEdge(vertexA, vertexD, 10);
  vertexA.addEdge(edgeAB);
  vertexA.addEdge(edgeAC);
  vertexA.addEdge(edgeAD);

  const edgeBE = new GraphEdge(vertexB, vertexE, 3);
  vertexB.addEdge(edgeBE);

  const edgeCD = new GraphEdge(vertexC, vertexD, 4);
  const edgeCF = new GraphEdge(vertexC, vertexF, 2);
  vertexC.addEdge(edgeCD);
  vertexC.addEdge(edgeCF);

  const edgeDE = new GraphEdge(vertexD, vertexE, 1);
  vertexD.addEdge(edgeDE);

  const edgeEB = new GraphEdge(vertexE, vertexB, 3);
  const edgeEA = new GraphEdge(vertexE, vertexA, 2);
  vertexE.addEdge(edgeEB);
  vertexE.addEdge(edgeEA);

  const edgeFD = new GraphEdge(vertexF, vertexD, 1);
  vertexF.addEdge(edgeFD);

  return {
    vertexA,
    vertexB,
    vertexC,
    vertexD,
    vertexE,
    vertexF,
  };
}