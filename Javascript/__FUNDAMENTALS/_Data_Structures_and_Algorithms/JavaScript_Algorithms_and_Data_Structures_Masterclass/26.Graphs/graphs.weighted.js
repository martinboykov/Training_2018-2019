// implementing weighted graph (needed for dijkstra algorithm)
class WeightedGraph {
  constructor() {
    this.list = {};
  }
  addVertex(vertex) { // add node
    if (!this.list[vertex]) this.list[vertex] = [];
  }
  addEdge(vertexA, vertexB, weight) { // add connection
    if (!this.list[vertexA] || !this.list[vertexB]) return null;
    const ifExistA = this.list[vertexA].some((el) => el === vertexB); // if vertex b is in A
    const ifExistB = this.list[vertexB].some((el) => el === vertexA); // if vertex A is in B
    if (ifExistA && ifExistB) return null;
    if (!ifExistA) this.list[vertexA].push({ node: vertexB, weight });
    if (!ifExistB) this.list[vertexB].push({ node: vertexA, weight });
    return this.list;
  }
  removeEdge(vertexA, vertexB) {
    // ...
  }
  removeVertex(vertexA) {
    // ...
  }
}
const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);
console.log(graph.list);
