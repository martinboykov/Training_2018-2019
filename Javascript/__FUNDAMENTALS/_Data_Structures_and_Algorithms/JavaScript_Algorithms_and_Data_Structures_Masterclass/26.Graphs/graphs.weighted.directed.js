// -----------------------
// WIGHTED, DIRECTED GRAPH
// -----------------------

// DESCRIBTION
// -------------
// same as unweighted, directed graphgraph, but with weight for every edge
// implementing weighted, directed graph

class GraphWeightedDirected {
  constructor() {
    this.list = {};
  }
  addVertex(vertex) { // add node
    if (!this.list[vertex]) this.list[vertex] = [];
  }
  addEdge(vertexStart, vertexEnd, weight) { // add directed connection
    // check if vertices exists
    if (!this.list[vertexStart] || !this.list[vertexEnd]) return null;

    // get vertex index in the edge list of the ohter vertex
    const indexStart = this.list[vertexStart].findIndex((el) => {
      return el.node === vertexEnd; // if vertex Start is in vertex End list already, get the index
    });
    const indexEnd = this.list[vertexEnd].findIndex((el) => {
      return el.node === vertexStart; // if vertex A is in B already, get the index
    });

    // if vertex (Start) is not in the list of edges of Vertex (End) => add it
    if (indexStart < 0) {
      this.list[vertexStart].push({ node: vertexEnd, weight: weight });
    }
    // if vertex (Start/End) is in the list of edges of Vertex (End/Start) => overwrite the weight
    if (indexStart >= 0) this.list[vertexStart][indexStart].weight = weight; // A: B,w1 -> A: B,w2
    if (indexEnd >= 0) this.list[vertexEnd][indexEnd].weight = weight; // B: A,w1 -> B: A,w2
    return this.list;
  }

  removeEdge(vertexA, vertexB) {
    // ...
  }
  removeVertex(vertexA) {
    // ...
  }

  dfsR(vertex, visitedVerteces = {}) { // Defpth First (Recursive)
    visitedVerteces[vertex] = true;
    for (const key in this.list[vertex]) { // verteces ['v1', 'v2', ...] forming edges with this vertex;
      if (this.list[vertex].hasOwnProperty(key)) {
        const edge = this.list[vertex][key];
        if (!visitedVerteces[edge.node]) { // O(1) - using object (hashtable)
          visitedVerteces[edge.node] = true; // add the vertex (v) to all verteces, been already traversed
          this.dfsR(edge.node, visitedVerteces); // call dfs with vertex (v) and all already treversed verteces
        }
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
      this.list[vertex].forEach((obj) => {
        // if vertex is not yet visited -> push to stack verteces that form edge with it
        if (!visitedVerteces[obj.node]) stack.push(obj.node);
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
      for (const key in list[currentVertex]) {
        if (list[currentVertex].hasOwnProperty(key)) {
          const v = list[currentVertex][key].node; // get one vertex of the list of verteces
          const ifNotVisited = !visitedVerteces[v]; // O(1) - using object (hashtable)
          if (ifNotVisited) {
            visitedVerteces[v] = true; // mark as visited
            queue.unshift(v);
          }
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
      this.list[vertex].forEach((obj) => {
        // if vertex is not yet visited -> push to queue verteces that form edge with it
        if (!visitedVerteces[obj.node]) queue.unshift(obj.node);
      });
    }
    return Object.keys(visitedVerteces); // the path taken
  }
}

module.exports = GraphWeightedDirected;


// const graph = new GraphWeightedDirected();
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// // graph.addEdge('A', 'B', 4);
// // console.log(graph.list);
// // graph.addEdge('A', 'B', 8);
// // console.log(graph.list);
// // graph.addEdge('B', 'A', 6);
// // console.log(graph.list);

// graph.addEdge('A', 'C', 2);
// graph.addEdge('B', 'E', 3);
// graph.addEdge('C', 'D', 2);
// graph.addEdge('C', 'F', 4);
// graph.addEdge('D', 'E', 3);
// graph.addEdge('D', 'F', 1);
// graph.addEdge('E', 'F', 1);
// console.log(graph.dfsR('A'));
// console.log(graph.dfsI('A'));
// console.log(graph.bfsR('A'));
// console.log(graph.bfsI('A'));
