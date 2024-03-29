// -------------------------
// UNWEIGHTED, DIRECTED GRAPH
// -------------------------

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

// TRAVERSAL
// ---------
//      - No starting point (trees, lists have root)

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
class DirectedGraph {
  constructor() {
    this.list = {};
  }
  addVertex(vertex) { // add node
    if (!this.list[vertex]) this.list[vertex] = [];
  }
  addEdge(vertexStart, vertexEnd) { // add connection
    // check if vertices exists
    if (!this.list[vertexStart] || !this.list[vertexEnd]) return null;

    // get vertex index in the edge list of the other vertex
    const indexStart = this.list[vertexStart].findIndex((el) => {
      return el.node === vertexEnd; // if vertex Start is in vertex End list already, get the index
    });
    // if vertex (Start) is not in the list of edges of Vertex (End) => add it
    if (indexStart < 0) this.list[vertexStart].push(vertexEnd);
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

  dfsR(vertex, visitedVerteces = {}) { // Defpth First (Recursive)
    visitedVerteces[vertex] = true;
    for (const v of this.list[vertex]) { // verteces ['v1', 'v2', ...] forming edges with this vertex;
      if (!visitedVerteces[v]) { // O(1) - using object (hashtable)
        visitedVerteces[v] = true; // add the vertex (v) to all verteces, been already traversed
        this.dfsR(v, visitedVerteces); // call dfs with vertex (v) and all already treversed verteces
      }
    }
    return Object.keys(visitedVerteces); // the path taken as array
  }

  dfsI(vertex) { // Defpth First (Iterative)
    if (!this.list[vertex]) return null;
    const stack = []; // or use stack class from 21.
    const visitedVerteces = {};
    stack.push(vertex);
    while (stack.length !== 0) {
      vertex = stack.pop();
      visitedVerteces[vertex] = true;
      this.list[vertex].forEach((v) => {
        // if vertex is not yet visited -> push to stack verteces that form edge with it
        if (!visitedVerteces[v]) stack.push(v);
      });
    }
    return Object.keys(visitedVerteces); // the path taken
  }

  bfsR(vertex, visitedVerteces = {}) { // Breath First (Recursive)
    const list = this.list; // cant access this list inside recursion helper function
    visitedVerteces[vertex] = true;
    const queue = []; // or use queue class from 21.
    queue.unshift(vertex);
    (function recursion(currentVertex) {
      for (const v of list[currentVertex]) { // verteces forming edges with currentVertex
        const ifNotVisited = !visitedVerteces[v]; // O(1) - using object (hashtable)
        if (ifNotVisited) {
          visitedVerteces[v] = true; // mark as visited
          queue.unshift(v);
        }
      }
      const nextVertex = queue.pop();
      if (nextVertex) recursion(nextVertex, visitedVerteces); // call dfs with vertex (v) and all already treversed verteces
      return visitedVerteces;
    }(vertex));
    return Object.keys(visitedVerteces); // the path taken as array
  }
  bfsI(vertex) { // Breath First (Iterative)
    const queue = []; // or use queue class from 21. (better Time complexity)
    const visitedVerteces = {};
    queue.unshift(vertex);
    while (queue.length !== 0) {
      vertex = queue.pop();
      visitedVerteces[vertex] = true;
      this.list[vertex].forEach((v) => {
        // if vertex is not yet visited -> push to queue verteces that form edge with it
        if (!visitedVerteces[v]) queue.unshift(v);
      });
    }
    return Object.keys(visitedVerteces); // the path taken
  }
}

module.exports = { DirectedGraph };


// const graph = new GraphDirected();
// graph.addVertex('A');

// check if A gets overwritten:
// graph.list['A'].push('B');
// console.log(graph);
// graph.addVertex('A');
// console.log(graph);

// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('Z');

// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('B', 'D');
// graph.addEdge('C', 'A');
// graph.addEdge('C', 'E');
// graph.addEdge('D', 'E');
// graph.addEdge('D', 'F');
// graph.addEdge('E', 'F');

//        A
//       / \
//      B   C
//      |   |
//      D---E
//       \ /
//        F

// graph.removeEdge('C', 'A');
// graph.removeVertex('C');

// console.log(graph);

// console.log(graph.dfsR('C'));
// console.log(graph.dfsI('C'));
// console.log(graph.bfsR('C'));
// console.log(graph.bfsI('C'));

