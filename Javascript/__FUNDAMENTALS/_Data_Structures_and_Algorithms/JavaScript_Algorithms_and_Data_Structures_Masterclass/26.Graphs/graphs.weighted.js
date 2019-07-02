// ----------------
// WEIGHTED GRAPH
// ----------------

// same as unweighted graph, but with weight for every edge
// implementing weighted graph (needed for dijkstra algorithm)
class GraphWeightedUndirected {
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
    if (!ifExistA) this.list[vertexA].push({ node: vertexB, weight: weight });
    if (!ifExistB) this.list[vertexB].push({ node: vertexA, weight: weight });
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

module.exports = { GraphWeightedUndirected };

// const graph = new GraphWeighted();
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addEdge('A', 'B', 4);
// graph.addEdge('A', 'C', 2);
// graph.addEdge('B', 'E', 3);
// graph.addEdge('C', 'D', 2);
// graph.addEdge('C', 'F', 4);
// graph.addEdge('D', 'E', 3);
// graph.addEdge('D', 'F', 1);
// graph.addEdge('E', 'F', 1);
// console.log(graph.list);
// console.log(graph.dfsR('A'));
// console.log(graph.dfsI('A'));
// console.log(graph.bfsR('A'));
// console.log(graph.bfsI('A'));
