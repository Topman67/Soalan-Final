export function createBinarySteps(input, target, options = {}) {
  const sorted = [...input].sort((a, b) => a - b);
  const steps = [];
  let low = 0;
  let high = sorted.length - 1;
  let id = 0;

  const eliminatedFor = (currentLow, currentHigh) => ({
    eliminatedLeft: Array.from({ length: currentLow }, (_, index) => index),
    eliminatedRight: Array.from({ length: sorted.length - currentHigh - 1 }, (_, index) => currentHigh + 1 + index),
  });

  if (options.quadratic) {
    steps.push({
      id: id++,
      array: sorted,
      low,
      high,
      mid: null,
      target,
      active: [],
      found: false,
      comparison: 'Preprocessing',
      decision: 'Run modified O(n²) preprocessing before binary search.',
      ...eliminatedFor(low, high),
      message: 'Run an O(n^2) preprocessing pass as required by the modified question.',
    });
  }

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const value = sorted[mid];
    const found = value === target;
    const decision = found
      ? `${target} is found at index ${mid}.`
      : value < target
        ? `${value} < ${target}, search right half.`
        : `${value} > ${target}, search left half.`;
    steps.push({
      id: id++,
      array: sorted,
      low,
      high,
      mid,
      target,
      active: [low, mid, high],
      found,
      comparison: `Mid = ${value} at index ${mid}`,
      decision,
      ...eliminatedFor(low, high),
      message: found
        ? `${target} is found at index ${mid}.`
        : `Check middle value ${value} at index ${mid}. Since ${decision.toLowerCase()}`,
    });
    if (found) break;
    if (value < target) low = mid + 1;
    else high = mid - 1;
  }

  return { steps };
}
