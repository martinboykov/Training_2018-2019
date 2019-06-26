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
  dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const priorQueue = new PriorityQueue();
    let shortestPath = [];
    // loop through graph to create objects: priorQueue, distances, previous
    for (const vertex in this.list) {
      if (this.list.hasOwnProperty(vertex)) {
        previous[vertex] = null;
        distances[vertex] = Infinity;
        priorQueue.enqeue(vertex, Infinity);
      }
    }
    priorQueue.values[0].priority = 0;
    distances[start] = 0;

    // 1. Every time we look to visit a new node,
    // we pick the node with the smallest known distance to visit first.
    while (priorQueue.values.length !== 0) {
      let smallestPQ = priorQueue.deqeue().value; // A <= {value:'A', priority:0} smallestPQ = 'A' in the first iteration

      // check if:
      //   - we are not at end
      //   - if smallestPQ ('A') is defined OR the accumulative weight is NOT Ininity
      if (smallestPQ !== end &&
        (smallestPQ || distances[smallestPQ] !== Infinity)) { // 0 <= in the beggining is ("A": 0)
        // 2. Once we’ve moved to the node we’re going to visit, we look at each of its neighbors
        for (const indexEdge in this.list[smallestPQ]) { // 0 <= loop through all edges with "A" -> [{node: "B": weight: Infinity}] and {"C": weight}
          if (this.list[smallestPQ].hasOwnProperty(indexEdge)) {
            // getting the neighboring edge
            const edge = this.list[smallestPQ][indexEdge]; // {node: "B": weight: 4} <= {'A': [{"B":2}]}, where indexEdgeGraph corresponds to the arrays (all edges) index
            // 3. For each neighboring node, we calculate the distance by summing
            // the total edges that lead to the node we’re checking from the starting node.
            const edgeWeightAccumulative = distances[smallestPQ] + edge.weight; // weight: 4
            const edgeVertex = edge.node; // node: "B"
            // 4. If the new total distance to a node is less than the previous total,
            // we store the new shorter distance for that node.
            if (edgeWeightAccumulative < distances[edgeVertex]) {
              // updating new smallest distance to ... node: "B" (Infinity -> 4)
              distances[edgeVertex] = edgeWeightAccumulative;

              // updating the path to edgeGraphIndex
              previous[edgeVertex] = smallestPQ; // comes from ... 'A' (null -> 'A')

              // enqueu in priority qeueu (add neighbor vertexes of the vertex that forms edge with 'A' -> 'C' and 'B')
              priorQueue.enqeue(edgeVertex, edgeWeightAccumulative);
            }
          }
        }
      } else { // "E" === "E"
        // if at END -> build the path to START
        while (previous[smallestPQ]) { // as "A" stays null => thats the bottom of iteration cycle
          shortestPath.push(smallestPQ);
          smallestPQ = previous[smallestPQ]; // 'E': 'F' -> 'F': 'D' -> 'D': 'C' -> 'C':'A'
        }
        shortestPath = shortestPath.concat(smallestPQ).reverse();
        console.log('priorQueue: ', priorQueue);
        console.log('distances: ', distances);
        console.log('previous: ', previous);
        console.log('shortestPath', shortestPath);
        // console.log('shortestDistance: ', distances[end]);
        return shortestPath;
      }
    }
    return shortestPath; // because of eslint
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
graph.dijkstra('A', 'E');

