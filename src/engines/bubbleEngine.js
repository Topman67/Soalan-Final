export function createBubbleSteps(input) {
  const arr = [...input];
  const steps = [{ id: 0, array: [...arr], active: [], sorted: [], message: 'Start with the unsorted input array.' }];
  let id = 1;

  for (let pass = 0; pass < arr.length - 1; pass += 1) {
    let swapped = false;
    for (let i = 0; i < arr.length - pass - 1; i += 1) {
      steps.push({
        id: id++,
        array: [...arr],
        active: [i, i + 1],
        sorted: Array.from({ length: pass }, (_, idx) => arr.length - 1 - idx),
        message: `Compare ${arr[i]} and ${arr[i + 1]}.`,
      });
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        steps.push({
          id: id++,
          array: [...arr],
          active: [i, i + 1],
          swapped: [i, i + 1],
          sorted: Array.from({ length: pass }, (_, idx) => arr.length - 1 - idx),
          message: 'Swap because the left value is larger.',
        });
      }
    }
    if (!swapped) break;
  }

  steps.push({
    id,
    array: [...arr],
    active: [],
    sorted: arr.map((_, index) => index),
    message: 'The array is sorted in ascending order.',
  });
  return { steps };
}
