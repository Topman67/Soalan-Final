export function createAssignmentSteps(matrix) {
  const steps = [];
  const leaves = [];
  let id = 0;

  function walk(workerIndex, remainingJobs, path, cost, depth) {
    steps.push({
      id: id++,
      tree: { path, cost, depth },
      active: path,
      message: path.length ? `Expand ${path.join(' -> ')} with cumulative cost ${cost}.` : 'Start at root with no assignments.',
    });

    if (workerIndex === matrix.length) {
      leaves.push({ path, cost });
      return;
    }

    const row = matrix[workerIndex];
    remainingJobs.forEach((jobIndex) => {
      walk(
        workerIndex + 1,
        remainingJobs.filter((job) => job !== jobIndex),
        [...path, `${row.worker}-J${jobIndex + 1}`],
        cost + row.jobs[jobIndex],
        depth + 1,
      );
    });
  }

  walk(0, [0, 1, 2, 3], [], 0, 0);
  const bestCost = Math.min(...leaves.map((leaf) => leaf.cost));
  const best = leaves.filter((leaf) => leaf.cost === bestCost);
  return { steps, leaves: leaves.sort((a, b) => a.cost - b.cost), best, bestCost };
}
