// Shortest Reach of unweighted, undirected graph - https://www.youtube.com/watch?v=0XgVhsMOcQM&list=PLI1t_8YX-ApvMthLj56t1Rf-Buio5Y8KL&index=4
// https://www.hackerrank.com/challenges/bfsshortreach/problem

const Graph = require('../graphs.unweighted');

// only shortest distance
// function getShortestPath(vertexStart, graph) {
//   const queue = []; // or use queue class from 21. (better Time complexity)
//   const distances = {};
//   // fill distances obj keys === keys of graph.list
//   for (const key in graph.list) {
//     if (graph.list.hasOwnProperty(key)) {
//       distances[key] = -Infinity;
//     }
//   }
//   distances[vertexStart] = 0; // starting vertex has 0 distance to it self
//   queue.unshift(vertexStart);
//   while (queue.length !== 0) {
//     const currentVertex = queue.pop();
//     for (const neighbor of graph.list[currentVertex]) {
//       // if vertex is not yet visited -> push to queue verteces that form edge with it
//       if (distances[neighbor] === - Infinity) {
//         distances[neighbor] = distances[currentVertex] + 1;
//         queue.unshift(neighbor);
//       }
//     }
//   }
//   return distances; // the path taken
// }

// with path inlcluded
function getShortestPath(vertexStart, graph) {
  const queue = []; // or use queue class from 21. (better Time complexity)
  const memo = {};
  // fill distances obj keys === keys of graph.list
  for (const key in graph.list) {
    if (graph.list.hasOwnProperty(key)) {
      memo[key] = { distance: -Infinity, path: [] };
    }
  }
  memo[vertexStart].distance = 0; // starting vertex has 0 distance to it self
  queue.unshift(vertexStart);
  while (queue.length !== 0) {
    const currentVertex = queue.pop();
    for (const neighbor of graph.list[currentVertex]) {
      // if vertex is not yet visited -> push to queue verteces that form edge with it
      if (memo[neighbor].distance === - Infinity) {
        memo[neighbor].distance = memo[currentVertex].distance + 1;
        const length = memo[currentVertex].path.length;
        memo[neighbor].path.push(currentVertex);
        for (let index = 0; index < length; index += 1) {
          const element = memo[currentVertex].path[index];
          memo[neighbor].path.push(element);
        }
        queue.unshift(neighbor);
      }
    }
  }
  return memo; // the path taken
}

const graph = new Graph();

graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);
graph.addEdge(0, 3);
graph.addEdge(0, 5);
graph.addEdge(3, 1);
graph.addEdge(3, 4);
graph.addEdge(3, 6);
graph.addEdge(5, 4);
graph.addEdge(1, 2);
graph.addEdge(7, 8);
console.log(graph);

// console.log('bfsI: ', graph.bfsITerativeFind(1, 0));
console.log(getShortestPath(0, graph));

// console.log('dfsR: ', graph.dfsR(1));
// console.log('dfsI: ', graph.dfsI(1));
// console.log('bfsR: ', graph.bfsR(1));
// console.log('bfsI: ', graph.bfsI(1));
