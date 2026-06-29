export function createMergeSteps(input) {
  const steps = [];
  let id = 0;

  function record(groups, active, message) {
    steps.push({ id: id++, groups: groups.map((group) => [...group]), active, message });
  }

  function sort(values, depth = 0) {
    record([values], [depth], `Split group [${values.join(', ')}].`);
    if (values.length <= 1) {
      record([values], [depth], 'Base case: one item is already sorted.');
      return values;
    }
    const mid = Math.ceil(values.length / 2);
    const left = sort(values.slice(0, mid), depth + 1);
    const right = sort(values.slice(mid), depth + 1);
    const merged = merge(left, right);
    record([left, right, merged], [2], `Merge [${left.join(', ')}] and [${right.join(', ')}].`);
    return merged;
  }

  function merge(left, right) {
    const output = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) output.push(left[i++]);
      else output.push(right[j++]);
    }
    return [...output, ...left.slice(i), ...right.slice(j)];
  }

  record([input], [], 'Start merge sort.');
  const sorted = sort([...input]);
  record([sorted], [0], 'Final sorted array is complete.');
  return { steps };
}
