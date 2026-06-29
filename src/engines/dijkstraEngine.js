export function createDijkstraSteps(nodes, edges, source = 'A', target = 'G') {
  const adjacency = edges.reduce((map, [from, to, weight]) => {
    map[from] = [...(map[from] || []), [to, weight]];
    map[to] = [...(map[to] || []), [from, weight]];
    return map;
  }, {});
  const distances = Object.fromEntries(Object.keys(nodes).map((node) => [node, Infinity]));
  const previous = {};
  const visited = new Set();
  const steps = [];
  let id = 0;
  distances[source] = 0;

  while (visited.size < Object.keys(nodes).length) {
    const current = Object.keys(distances)
      .filter((node) => !visited.has(node))
      .sort((a, b) => distances[a] - distances[b])[0];
    if (!current || distances[current] === Infinity) break;
    visited.add(current);

    for (const [next, weight] of adjacency[current] || []) {
      if (visited.has(next)) continue;
      const candidate = distances[current] + weight;
      if (candidate < distances[next]) {
        distances[next] = candidate;
        previous[next] = current;
      }
    }

    steps.push({
      id: id++,
      current,
      visited: [...visited],
      distances: { ...distances },
      previous: { ...previous },
      message: `Visit ${current} and relax its connected edges.`,
    });
    if (current === target) break;
  }

  return { steps };
}

export function pathFromPrevious(previous, target = 'G') {
  const path = [target];
  let current = target;
  while (previous[current]) {
    current = previous[current];
    path.unshift(current);
  }
  return path;
}
