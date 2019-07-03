// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Prim’s Minimum Spanning Tree (MST) | Greedy Algo-5 - https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/
// https://www.youtube.com/watch?v=PzznKcMyu0Y
// https://www.youtube.com/watch?v=4ZlRH0eK-qQ

// Condition - Graph must be connected!

const { GraphWeightedUndirected } = require('../graphs.weighted');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

function prim(graph) {
  // Init new graph that will contain minimum spanning tree of original graph.
  const minimumSpanningTree = new GraphWeightedUndirected();

  // This priority queue will contain all the edges that are starting from
  // visited nodes and they will be ranked by edge weight - so that on each step
  // we would always pick the edge with minimal edge weight.
  const edgesQueue = new PriorityQueue();

  // Set of vertices that has been already visited.
  const visitedVertices = {};

  // get all vertices of the graph
  const vertices = Object.keys(graph.list);

  // set starting vertex
  let startVerex = vertices[0];

  // add it to visited ones
  visitedVertices[startVerex] = true;
  // add it to min span graph
  minimumSpanningTree.addVertex(startVerex);

  // Add all edges of start vertex to the queue.
  graph.list[startVerex].forEach((vertexEdge) => {
    edgesQueue.enqeue(vertexEdge.node, vertexEdge.weight);
  });
  // Find all min edges
  while (!edgesQueue.isEmpty()) {
    let currentMinEdge = edgesQueue.deqeue();
    console.log(currentMinEdge);
    while (visitedVertices[currentMinEdge.value]) {
      currentMinEdge = edgesQueue.deqeue();
      if (edgesQueue.isEmpty()) break;
    }
    // If all vertices of current edge has been already visited then skip this round.
    if (currentMinEdge) {
      // Add current min edge to MST.
      minimumSpanningTree.addVertex(currentMinEdge.value);
      minimumSpanningTree.addEdge(startVerex, currentMinEdge.value, currentMinEdge.priority);

      // Add vertex to the set of visited ones.
      visitedVertices[currentMinEdge.value] = true;

      // reset queue, so we have only unvisited edges of current node
      edgesQueue.values = [];
      // Add all current vertex's edges to the queue.
      startVerex = currentMinEdge.value;
      graph.list[startVerex].forEach((nextEdge) => {
        // Add only vertices that link to unvisited nodes.
        if (!visitedVertices[nextEdge.node]) {
          edgesQueue.enqeue(nextEdge.node, nextEdge.weight);
        }
      });
    }
  }
  // console.log(minimumSpanningTree.list);
  return minimumSpanningTree;
}
// test 1 - https://www.youtube.com/watch?v=PzznKcMyu0Y
// const graph = new GraphWeightedUndirected();
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addEdge('A', 'B', 10);
// graph.addEdge('A', 'C', 20);
// graph.addEdge('B', 'C', 30);
// graph.addEdge('B', 'D', 5);
// graph.addEdge('C', 'D', 15);
// graph.addEdge('C', 'E', 6);
// graph.addEdge('D', 'E', 8);

// console.log(graph.list);
// console.log(prim(graph));

// test 2 - ttps://www.youtube.com/watch?v=4ZlRH0eK-qQ
const graph = new GraphWeightedUndirected();
graph.addVertex('1');
graph.addVertex('2');
graph.addVertex('3');
graph.addVertex('4');
graph.addVertex('5');
graph.addVertex('6');
graph.addVertex('7');
graph.addEdge('1', '2', 28);
graph.addEdge('1', '6', 10);
graph.addEdge('2', '3', 16);
graph.addEdge('2', '7', 14);
graph.addEdge('3', '4', 12);
graph.addEdge('4', '5', 22);
graph.addEdge('4', '7', 18);
graph.addEdge('5', '6', 25);
graph.addEdge('5', '7', 24);

console.log(graph.list);
prim(graph);
