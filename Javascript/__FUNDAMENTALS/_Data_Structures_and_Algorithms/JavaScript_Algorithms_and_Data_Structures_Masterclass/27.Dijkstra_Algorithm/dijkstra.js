// implementing weighted graph (needed for dijkstra algorithm)
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
    if (!ifExistA) this.list[vertexA].push({ node: vertexB, weight });
    if (!ifExistB) this.list[vertexB].push({ node: vertexA, weight });
    return this.list;
  }
  dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const priorQueue = new PriorityQueue();
    let shortestPath = [];
    // create objects:  newPriorQueue, distances, previous
    for (const vertex in this.list) {
      if (this.list.hasOwnProperty(vertex)) {
        previous[vertex] = null;
        distances[vertex] = Infinity;
        priorQueue.enqeue(vertex, Infinity);
      }
    }
    priorQueue.enqeue(start, 0);
    distances[start] = 0;

    // loop while priority qeue is not empty
    while (priorQueue.values.length !== 0) {
      let smallest = priorQueue.deqeue().value;
      if (smallest === end) {
        // done -> build the path to return at end
        while (previous[smallest]) {
          shortestPath.push(smallest);
          smallest = previous[smallest];
        }
        shortestPath = shortestPath.concat(smallest).reverse();
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (const neighbor in this.list[smallest]) {
          if (this.list[smallest].hasOwnProperty(neighbor)) {

            // getting each neighboring nodes
            const nextVertex = this.list[smallest][neighbor];

            // calculate distance to neighboring nodes
            const candidate = distances[smallest] + nextVertex.weight;
            const nextNeighbor = nextVertex.node;
            if (candidate < distances[nextNeighbor]) {
              // updating new smallest disstance to neighbor
              distances[nextNeighbor] = candidate;

              // updating the path to neighbor
              previous[nextNeighbor] = smallest;

              // enqueu in priority qeueu
              priorQueue.enqeue(nextNeighbor, candidate);
            }
          }
        }
      }
    }


    console.log(priorQueue);
    console.log(distances);
    console.log(previous);
    console.log(shortestPath);
    return shortestPath;
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
//  console.log(graph.list);
graph.dijkstra('A', 'E');

