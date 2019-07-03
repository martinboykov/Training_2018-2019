// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Bridges in a graph - https://www.geeksforgeeks.org/bridge-in-a-graph/
// https://www.youtube.com/watch?v=thLQYBlz2DM
// https://www.youtube.com/watch?v=aZXi1unBdJA

// Condition - Graph must be connected!

const { GraphUndirected } = require('../graphs.unweighted');

// modified DFS
GraphUndirected.prototype.isBridgeUtil = // modified dfsR
  function(currVertex, visited, disc, low, parent, bridges, counter) {
    // Mark the current node as visited
    visited[currVertex] = true;
    // Initialize discovery time and low value
    counter += 1;
    disc[currVertex] = counter;
    low[currVertex] = counter;

    // visit the neighbor vertexes
    this.list[currVertex].forEach((neighborVertex) => {
      // If neighborVertex is not visited yet, then recur for it
      if (!visited[neighborVertex]) {
        // set the parent of neighborVertex as currVertex
        parent[neighborVertex] = currVertex; // currVertex is letter

        this.isBridgeUtil(neighborVertex, visited, disc, low, parent, bridges, counter);

        // Check if the subtree rooted with v has a connection to one of the ancestors of vertex
        low[currVertex] = Math.min(low[currVertex], low[neighborVertex]);

        // If the lowest vertex reachable from subtree
        // under neighborVertex is below currVertex in DFS tree, then is a bridge
        if (low[neighborVertex] > disc[currVertex]) {
          bridges.push({ startEdge: currVertex, endEdge: neighborVertex });
        }
      } else if (parent[currVertex]) { // the start parent is null => skip it
        if (neighborVertex.toString() !== parent[currVertex].toString()) { // so numbers are threated as strings
          // Update low value of vertex for parent function calls.
          low[currVertex] = Math.min(low[currVertex], disc[neighborVertex]);
        }
      }
    });
  };
function bridge(graph) {
  const visited = {};
  const disc = {};
  const low = {};
  const parent = {};
  const bridges = [];
  const counter = 0;

  const vertices = Object.keys(graph.list);
  vertices.forEach((vertex) => {
    parent[vertex] = null;
  });
  vertices.forEach((vertex) => {
    if (!visited[vertex]) {
      graph.isBridgeUtil(vertex, visited, disc, low, parent, bridges, counter);
    }
  });
  return bridges;
}
// // test 1 - https://www.youtube.com/watch?v=thLQYBlz2DM
// const graph = new GraphUndirected();
// graph.addVertex(0);
// graph.addVertex(1);
// graph.addVertex(2);
// graph.addVertex(3);
// graph.addVertex(4);
// graph.addVertex(5);
// graph.addEdge(0, 1);
// graph.addEdge(1, 2);
// graph.addEdge(1, 5);
// graph.addEdge(2, 3);
// graph.addEdge(3, 4);
// graph.addEdge(3, 5);

// console.log(graph.list);
// console.log(bridge(graph));

// test 2 - https://www.youtube.com/watch?v=aZXi1unBdJA
const graph = new GraphUndirected();
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(5, 6);
graph.addEdge(5, 8);
graph.addEdge(6, 7);
graph.addEdge(7, 8);

console.log(graph.list);
console.log(bridge(graph));
