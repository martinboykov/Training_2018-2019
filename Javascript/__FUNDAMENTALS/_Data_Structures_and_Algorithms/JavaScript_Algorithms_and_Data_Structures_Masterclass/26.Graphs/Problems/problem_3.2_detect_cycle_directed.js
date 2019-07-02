// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Detect Cycle in a Directed Graph
// https://www.geeksforgeeks.org/detect-cycle-in-a-graph/

const { DirectedGraph } = require('../graphs.unweighted.directed');

DirectedGraph.prototype.isCycleUtil = // modified dfsR
  function(vertex, visitedVerteces, stack = {}) {
    visitedVerteces[vertex] = true;
    stack[vertex] = true;

    for (const neighborV of this.list[vertex]) {
      // console.log(visitedVerteces);
      // console.log(stack);
      // console.log(vertex, neighborV);

      if (visitedVerteces[neighborV] && stack[neighborV]) {
        // console.log(true);
        return true;
      }
      if (!visitedVerteces[neighborV]) {
        visitedVerteces[neighborV] = true;
        stack[neighborV] = true;
        const isCycle = this.isCycleUtil(neighborV, visitedVerteces, stack);
        if (isCycle) return true;
        stack[neighborV] = false;
      }
    }
    return false;
  };

function detectCycle(graph) {
  const visitedVertices = {};
  const vertices = Object.keys(graph.list);
  let cycleDetected = false;
  for (const startVertex of vertices) {
    if (!visitedVertices[startVertex]) {
      visitedVertices[startVertex] = true;
      cycleDetected = (graph.isCycleUtil(startVertex, visitedVertices));
    }
    if (cycleDetected) return true;
  }
  return cycleDetected;
}


const graph = new DirectedGraph();
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addEdge(0, 1);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
// graph.addEdge(2, 0);
graph.addEdge(2, 3);
// graph.addEdge(3, 3);


graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addEdge(4, 5);
graph.addEdge(5, 6);
// graph.addEdge(6, 4);

console.log(graph.list);
console.log(detectCycle(graph));
