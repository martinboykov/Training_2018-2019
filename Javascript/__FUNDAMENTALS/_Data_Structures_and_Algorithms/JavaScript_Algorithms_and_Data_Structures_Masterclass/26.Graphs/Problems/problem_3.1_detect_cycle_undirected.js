// PART OF Top 10 algorithms in Interview Questions: https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Disjoint Set (Or Union-Find) | Set 1 (Detect Cycle in an Undirected Graph)
// https://www.geeksforgeeks.org/union-find/

const { UndirectedGraph } = require('../graphs.unweighted');
const { Queue } = require('../../21.Stacks_Queues/queue.array');

function detectCycle(graph) {
  const parentArray = {};
  const visitedVertices = {};
  const queue = new Queue();
  const vertices = Object.keys(graph.list);
  vertices.forEach((v) => {
    parentArray[v] = -1;
  });
  console.log(parentArray);

  for (let startVertex of vertices) {
    if (!visitedVertices[startVertex]) {
      queue.enqueue(startVertex);
      while (!queue.isEmpty()) {
        startVertex = queue.dequeue();
        console.log('start', startVertex);
        visitedVertices[startVertex] = true;
        for (const endVertex of graph.list[startVertex]) {
          console.log('end', endVertex);
          if (!visitedVertices[endVertex]) {
            // 1. check if vertices in same set

            // 1.1. get the root of startVertex
            const setStartData = getRoot(startVertex);
            const setStart = setStartData.rootKey !==
              startVertex ? parentArray[startVertex] : startVertex;
            const setStartLength = setStartData.length;

            // 1.2. get the root of endVertex
            const setEndData = getRoot(endVertex);
            const setEnd = setEndData.rootKey !==
              endVertex ? parentArray[endVertex] : endVertex;
            const setEndLength = setEndData.length;

            // 1.3. Check if in same set
            if (setStart === setEnd) {
              // cycle found => return true
              console.log(parentArray);
              return true;
            }

            // 2. If setStart !== setEnd perform Union (combine both sets - smaller into larger)
            // set with bigger size correspond to bigger negative number in parentArray

            const bigger = setStartLength <= setEndLength ? setStart : setEnd;
            const smaller = bigger !== setStart ? setStart : setEnd;
            parentArray[bigger] -= 1;
            parentArray[smaller] = +bigger;

            console.log(parentArray[bigger], parentArray[smaller]);
            queue.enqueue(endVertex);
          }
        }
      }
    }
  }
  console.log(parentArray);
  return false;
  function getRoot(vertex) {
    let rootValue = parentArray[vertex];
    let length = Infinity;
    let rootKey = null;
    while (rootValue >= 0) {
      rootKey = rootValue;
      rootValue = parentArray[rootValue];
      console.log(rootKey);
      console.log(rootValue);
    }
    length = rootValue;
    if (!rootKey) {
      rootKey = vertex;
    }
    return { rootKey, length };
  }
}


const graph = new UndirectedGraph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);

graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 1);
// graph.addEdge(2, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 1);
graph.addEdge(3, 4);
// graph.addEdge(4, 2);
graph.addEdge(4, 3);
// graph.addEdge(5, 6);
// graph.addEdge(5, 7);
graph.addEdge(6, 8);
graph.addEdge(7, 8);

console.log(graph.list);
console.log(detectCycle(graph));
