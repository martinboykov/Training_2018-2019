// implementing undirected, weighted graph (needed for dijkstra algorithm)
const {
  PriorityQueue,
} = require('../24.Binary_Heaps_&_Priority_Queues/priority.queues');

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
  dijkstra(graph, startVertex) {
    const distances = {};
    const visitedVertices = {};
    const previousVertices = {};
    const queue = new PriorityQueue();

    // Init all distances with infinity assuming that currently we can't reach
    // any of the vertices except the start one.
    const vertices = Object.keys(graph.list);
    vertices.forEach((vertex) => {
      distances[vertex] = Infinity;
      previousVertices[vertex] = null;
    });

    // go throught all vertices and find save distance from startVertex (if startVertex doesnt have and edge with the vertex, the distance is infinity)
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
    console.log('distances', distances);
    console.log('previousVertices', previousVertices);

    // We are already at the startVertex so the distance to it is zero.
    distances[startVertex] = 0;

    // Init vertices queue.
    queue.enqeue(startVertex, distances[startVertex]);

    // Iterate over the priority queue of vertices until it is empty.
    while (!queue.isEmpty()) {
      // Fetch next closest vertex.
      const currentVertex = queue.deqeue();

      // Iterate over every unvisited neighbor of the current vertex.
      graph.list[currentVertex.value].forEach((neighbor) => {
        // Don't visit already visited vertices.
        if (!visitedVertices[neighbor.node]) {
          // Update distances to every neighbor from current vertex.
          const edge = neighbor.weight;
          const existingDistanceToNeighbor = distances[neighbor.node];
          const distanceToNeighborFromCurrent =
            distances[currentVertex.value] + edge;

          // If we've found shorter path to the neighbor - update it.
          if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
            // update the distance to this vertex
            distances[neighbor.node] = distanceToNeighborFromCurrent;
            // Remember previous closest vertex.
            previousVertices[neighbor.node] = currentVertex.value;
            // Change priority of the neighbor in a queue since it might have became closer.
            if (queue.hasValue(neighbor.node)) {
              // queue.changePriority(neighbor, distances[neighbor.node]);
            }
          }
          // Add neighbor, which was not already visited and is not in the queue to the queue for further visiting.
          if (!queue.hasValue(neighbor.node) &&
            !visitedVertices[neighbor.node] &&
            neighbor.node !== currentVertex.value) {
            queue.enqeue(neighbor.node, distances[neighbor.node]);
          }
        }
      });
      // Add current vertex to visited ones to avoid visiting it again later.
      visitedVertices[currentVertex.value] = currentVertex;
    }
    // Return the set of shortest distances to all vertices and the set of
    // shortest paths to all vertices in a graph.
    return {
      distances,
      previousVertices,
    };
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
const result = graph.dijkstra(graph, 'F');
console.log(result.distances);
console.log(result.previousVertices);
