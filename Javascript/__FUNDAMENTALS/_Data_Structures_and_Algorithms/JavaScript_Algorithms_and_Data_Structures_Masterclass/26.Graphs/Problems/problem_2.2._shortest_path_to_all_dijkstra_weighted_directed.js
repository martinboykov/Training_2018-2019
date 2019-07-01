// modified Dijkstra algorithm - can handle negative values??? check abdul video to test it
// it stops only after ALL vertices are visited (original dijkstra stops after reaches goal by visiting the vertex on minimal distance)
// implemented shortPathToAll() - performing modified dijkstra algorithm to all vertices;
//
const {
  PriorityQueue,
} = require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

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
    if (!ifExistA) this.list[vertexA].push({ node: vertexB, weight: weight });
    if (!ifExistB) this.list[vertexB].push({ node: vertexA, weight: weight });
    return this.list;
  }
  dijkstra(startVertex) {
    const distances = {};
    const visitedVertices = {};
    const previousVertices = {};
    const queue = new PriorityQueue();

    // Init all distances with infinity assuming that currently we can't reach
    // any of the vertices except the start one.
    const vertices = Object.keys(this.list);
    vertices.forEach((vertex) => {
      distances[vertex] = Infinity;
      previousVertices[vertex] = null;
    });
    vertices.forEach((vertex) => {
      if (vertex === startVertex) {
        // Distance to the vertex itself is 0.
        distances[vertex] = 0;
        previousVertices[vertex] = null;
      } else {
        // Find edge between the start and end vertices.
        const edge = graph.list[startVertex].filter((v) => {
          return v.node.toString() === vertex; // endVertex is a string, while v.node is a number
        })[0];
        // console.log(edge);
        if (edge) {
          // There is an edge from vertex with startIndex to vertex with endIndex.
          // Save distance and previous vertex.
          distances[vertex] = edge.weight;
          previousVertices[vertex] = startVertex;
        } else {
          distances[vertex] = Infinity;
        }
      }
    });
    // console.log('distances', distances);
    // console.log('previousVertices', previousVertices);
    // We are already at the startVertex so the distance to it is zero.
    distances[startVertex] = 0;

    // Init vertices queue.
    queue.enqeue(startVertex, distances[startVertex]);
    // Iterate over the priority queue of vertices until it is empty.
    while (!queue.isEmpty()) {
      // console.log('queue', queue);
      // Fetch next closest vertex.
      const currentVertex = queue.deqeue();
      // console.log('currentVertex', currentVertex);
      // Iterate over every unvisited neighbor of the current vertex.
      graph.list[currentVertex.value].forEach((neighbor) => {
        // console.log('neighbor', neighbor);
        // Don't visit already visited vertices.
        if (!visitedVertices[neighbor.node]) {
          // Update distances to every neighbor from current vertex.
          const edge = neighbor.weight;

          const existingDistanceToNeighbor = distances[neighbor.node];
          const distanceToNeighborFromCurrent = distances[currentVertex.value] + edge;

          // If we've found shorter path to the neighbor - update it.
          if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
            distances[neighbor.node] = distanceToNeighborFromCurrent;

            // Change priority of the neighbor in a queue since it might have became closer.
            if (queue.hasValue(neighbor.node)) {
              // queue.changePriority(neighbor, distances[neighbor.node]);
              const root = queue.deqeue();
              queue.enqeue(root.value, distances[root.value]);
            }

            // Remember previous closest vertex.
            previousVertices[neighbor.node] = currentVertex.value;
            // console.log('previousVertices', previousVertices);
          }
          // Add neighbor to the queue for further visiting.
          if (!queue.hasValue(neighbor.node) && !visitedVertices[neighbor.node] && neighbor.node !== currentVertex.value) {
            queue.enqeue(neighbor.node, distances[neighbor.node]);
          }
        }
      });

      // Add current vertex to visited ones to avoid visiting it again later.
      visitedVertices[currentVertex.value] = currentVertex;
    }
    // console.log('visitedVertices', visitedVertices);
    // Return the set of shortest distances to all vertices and the set of
    // shortest paths to all vertices in a graph.
    return {
      distances,
      previousVertices,
    };
  }
  shortPathToAll() {
    for (const vertex in this.list) {
      if (this.list.hasOwnProperty(vertex)) {
        const result = this.dijkstra(vertex);
        console.log('vertex', vertex);
        console.log(result.distances);
        console.log(result.previousVertices);
      }
    }
    // this.list.forEach((el) => {
    //   const vertex = el.node;
    //   const result = this.dijkstra(vertex);
    //   console.log('vertex', vertex);
    //   console.log(result.distances);
    //   console.log(result.previousVertices);
    // });
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
//     A---B
//    /     \
//   /       \
//   C---D---E
//    \  |  /
//     \ | /
//       F
console.log(graph.list);
// const result = graph.dijkstra('F');
// console.log(result.distances);
// console.log(result.previousVertices);
graph.shortPathToAll();
