export function createBinarySteps(input, target, options = {}) {
  const sorted = [...input].sort((a, b) => a - b);
  const steps = [];
  let low = 0;
  let high = sorted.length - 1;
  let id = 0;

  if (options.quadratic) {
    steps.push({
      id: id++,
      array: sorted,
      low,
      high,
      mid: null,
      active: [],
      message: 'Run an O(n^2) preprocessing pass as required by the modified question.',
    });
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = sorted[mid];
    steps.push({
      id: id++,
      array: sorted,
      low,
      high,
      mid,
      active: [low, mid, high],
      found: value === target,
      message: value === target
        ? `${target} is found at position ${mid + 1}.`
        : `Middle value is ${value}. Search ${value < target ? 'right' : 'left'} half next.`,
    });
    if (value === target) break;
    if (value < target) low = mid + 1;
    else high = mid - 1;
  }

  return { steps };
}
