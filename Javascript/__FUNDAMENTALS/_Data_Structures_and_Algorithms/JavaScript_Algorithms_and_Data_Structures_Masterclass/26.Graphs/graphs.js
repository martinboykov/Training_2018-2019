// -------------
// GRAPHS
// -------------

// DEFINITION
// ----------
// Data structure consisting of nodes(vertices) and edges
// Similar to Linked lists, trees, but withou values in the nodes

// TYPES
// -----
// Directed/Undirected - directions assigned to distanced between nodes(vertices)
//   - Directed - one or two way link connections
//   - Undirected - always two way link connections
// Weighted/Unweighted - values assigned to distances between nodes(vertices)
//   - Weighted - each edge has value assigned to it
//   - Unweighted - edge have no value assigned to it (as trees, linked lists, etc..)

// IMPLEMENTAION
// -------------
// 1. Adjaceny List - storing edges (as arrays(for numeric values), or as objects/maps(for all kind of values))
//      - Can take up less space (in sparse graphs) - !!!storing only existing connections!!!
//      - Faster to iterate over all edges
//      - Can be slower to lookup specific edge
// 2. Adjaceny matrix - storing nodes (most of data in real world tends to be sparse (majority of nodes are connected))
//      - Takes up more space (in sparse graphs) - as potentially we will be storing informaion regarding connections that do not exist
//      - Slower to iterate over all edges
//      - Faster to lookup specific edge

// COMPLEXITIES - BIG O
// -------------------------------------------------------
// | OPERATION	     | ADJACENCY LIST	 | ADJACENCY MATRIX |
// | --------------- | --------------- | ---------------- |
// | Add Vertex	     | O(1)	           | O(|V^2|)         |
// | Add Edge  	     | O(1)	           | O(1)             |
// | Remove Vertex	 | O(|V| + |E|)    | O(|V^2|)         |
// | Remove Edge	   | O(|E|)	         | O(1)             |
// | Query	         | O(|V| + |E|)	   | O(1)             |
// | Storage (Space) | O(|V| + |E|)	   | O(|V^2|)         |

// 2. Adjaceny List (using object)
class Graph {
  constructor() {
    this.list = {};
  }
  addVertex(vertex) { // add node
    if (!this.list[vertex]) this.list[vertex] = [];
  }
  addEdge(vertexA, vertexB) { // add connection
    if (!this.list[vertexA] || !this.list[vertexB]) return null;
    const ifExistA = this.list[vertexA].some((el) => el === vertexB); // if vertex b is in A
    const ifExistB = this.list[vertexB].some((el) => el === vertexA); // if vertex A is in B
    if (ifExistA && ifExistB) return null;
    if (!ifExistA) this.list[vertexA].push(vertexB);
    if (!ifExistB) this.list[vertexB].push(vertexA);
    return this.list;
  }
  removeEdge(vertexA, vertexB) {
    if (!this.list[vertexA] || !this.list[vertexB]) return null;
    this.list[vertexA] = this.list[vertexA].filter((el) => el !== vertexB);
    this.list[vertexB] = this.list[vertexB].filter((el) => el !== vertexA);
    return this.list;
  }
  removeVertex(vertexA) {
    if (!this.list[vertexA]) return null;
    this.list[vertexA].forEach((vertex) => {
      this.removeEdge(vertexA, vertex);
    });
    delete this.list[vertexA];
    return this.list;
  }
}
const graph = new Graph();
console.log(graph);
graph.addVertex('Sofia');
// graph.list['Sofia'].push('Varna'); // to check if Sofia gets overwritten
// console.log(graph);
// graph.addVertex('Sofia');
// console.log(graph);
graph.addVertex('Varna');
console.log(graph.addEdge('Sofia', 'Varna'));
graph.addVertex('Plovdiv');
graph.addVertex('Gabrovo');
graph.addVertex('Ruse');
console.log(graph.addEdge('Sofia', 'Varna'));
console.log(graph.addEdge('Sofia', 'Plovdiv'));
console.log(graph.addEdge('Sofia', 'Gabrovo'));
console.log(graph.addEdge('Sofia', 'Ruse'));
console.log(graph.addEdge('Varna', 'Ruse'));
console.log(graph.addEdge('Varna', 'Gabrovo'));
// console.log(graph.removeEdge('Sofia', 'Varna'));
console.log(graph.removeVertex('Sofia'));
