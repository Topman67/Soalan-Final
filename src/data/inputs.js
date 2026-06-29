export const sem1BubbleInput = [7, 17, 3, 23, 11, 37, 9, 45, 15, 99];
export const sem2MergeInput = [9, 15, 5, 23, 11, 37, 3];
export const sem1BinaryInput = [1, 2, 4, 5, 6, 7, 8, 9, 27, 13, 15, 16, 18, 19, 20, 22];
export const sem2BinaryInput = [1, 2, 4, 5, 6, 7, 8, 9, 12, 13, 15, 16, 18, 19, 20, 22];

export const assignmentMatrix = [
  { worker: 'A', jobs: [9, 8, 7, 8] },
  { worker: 'B', jobs: [7, 4, 3, 4] },
  { worker: 'C', jobs: [5, 6, 1, 8] },
  { worker: 'D', jobs: [6, 2, 9, 7] },
];

export const graphNodes = {
  A: { x: 50, y: 8 },
  B: { x: 88, y: 32 },
  C: { x: 13, y: 32 },
  D: { x: 50, y: 32 },
  E: { x: 13, y: 63 },
  F: { x: 88, y: 63 },
  G: { x: 50, y: 88 },
};

export const graphEdges = [
  ['A', 'C', 8],
  ['A', 'B', 4],
  ['C', 'D', 10],
  ['D', 'B', 7],
  ['D', 'E', 12],
  ['D', 'F', 19],
  ['E', 'F', 11],
  ['E', 'G', 5],
  ['F', 'G', 9],
];

export const examPapers = [
  {
    id: 'sem1',
    label: 'Page 1',
    title: 'Semester I 2025/2026',
    subtitle: 'Bubble sort, modified binary search, divide-and-conquer, assignment problem',
    questions: [
      { id: 'sem1-bubble', short: 'Q1', title: 'Bubble Sort Algorithm', type: 'bubble' },
      { id: 'sem1-binary', short: 'Q2', title: 'Binary Search O(n^2)', type: 'binary-sem1' },
      { id: 'sem1-divide', short: 'Q3', title: 'Divide and Conquer', type: 'divide-sem1' },
      { id: 'sem1-assignment', short: 'Q4', title: 'Assignment State Space Tree', type: 'assignment' },
    ],
  },
  {
    id: 'sem2',
    label: 'Page 2',
    title: 'Semester II 2024/2025',
    subtitle: 'Merge sort, binary search, divide-and-conquer, weighted graph',
    questions: [
      { id: 'sem2-merge', short: 'Q1', title: 'Merge Sort Algorithm', type: 'merge' },
      { id: 'sem2-binary', short: 'Q2', title: 'Binary Search Algorithm', type: 'binary-sem2' },
      { id: 'sem2-divide', short: 'Q3', title: 'Divide and Conquer Algorithms', type: 'divide-sem2' },
      { id: 'sem2-dijkstra', short: 'Q4', title: 'Weighted Graph and Dijkstra', type: 'dijkstra' },
    ],
  },
];

export const answerBank = {
  bubble: {
    prompts: [
      'Write a bubble sort algorithm for {c1, c2, ..., cn}.',
      'Sort {7, 17, 3, 23, 11, 37, 9, 45, 15, 99} in ascending order.',
      'Estimate the worst-case complexity.',
    ],
    answer: 'Sorted result: {3, 7, 9, 11, 15, 17, 23, 37, 45, 99}. Worst-case complexity: O(n^2).',
    code: `BubbleSort(C[1..n])
for i = 1 to n - 1
  for j = 1 to n - i
    if C[j] > C[j + 1]
      swap C[j], C[j + 1]
return C`,
  },
  merge: {
    prompts: [
      'Write a merge sort algorithm for {a1, a2, ..., an}.',
      'Sort {9, 15, 5, 23, 11, 37, 3} in ascending order.',
      'Estimate the worst-case complexity.',
    ],
    answer: 'Sorted result: {3, 5, 9, 11, 15, 23, 37}. Worst-case complexity: O(n log n).',
    code: `MergeSort(A)
if length(A) <= 1 return A
left = MergeSort(first half)
right = MergeSort(second half)
return Merge(left, right)`,
  },
  'binary-sem1': {
    prompts: [
      'Construct a binary search algorithm with complexity O(n^2).',
      'Construct the recursive binary search algorithm based on Q2(a).',
      'Search number 27 in the given set.',
    ],
    answer: 'After sorting, search path is 13 -> 19 -> 22 -> 27. Number 27 is found at position 16 using 1-based indexing.',
    code: `BinarySearchQuadratic(A, target)
perform an O(n^2) nested-loop pass
then run standard binary search`,
  },
  'binary-sem2': {
    prompts: [
      'Construct the basic algorithm of binary search.',
      'Construct the recursive binary search algorithm.',
      'Search number 19 in the given set.',
    ],
    answer: 'Search path is 9 -> 16 -> 19. Number 19 is found at position 14 using 1-based indexing.',
    code: `RecursiveBinarySearch(A, target, low, high)
if low > high return not found
mid = floor((low + high) / 2)
if A[mid] == target return mid
if A[mid] < target search right half
else search left half`,
  },
  'divide-sem1': {
    prompts: ['Compute a^(5n).', 'Find the lowest value from n integers.', 'Estimate the time complexity of Q3(b).'],
    answer: 'Use recursive exponentiation on (a^5)^n. Minimum search recurrence is T(n)=2T(n/2)+O(1), so complexity is O(n).',
    code: `FindMin(X, left, right)
if left == right return X[left]
mid = floor((left + right) / 2)
return min(FindMin(left half), FindMin(right half))`,
  },
  'divide-sem2': {
    prompts: ['Compute a^(2n).', 'Find the lowest value from n integers.', 'Estimate the time complexity of Q3(b).'],
    answer: 'Use recursive exponentiation on (a^2)^n. Minimum search recurrence is T(n)=2T(n/2)+O(1), so complexity is O(n).',
    code: `Power2n(a, n)
if n == 0 return 1
if n is even return Power2n(a, n/2)^2
return a^2 * Power2n(a, n - 1)`,
  },
  assignment: {
    prompts: ['Draw levels 0 and 1.', 'Draw levels 0, 1 and 2.', 'Draw the complete state-space tree.'],
    answer: 'Optimal assignments have minimum cost 18: A-J3, B-J4, C-J1, D-J2 or A-J4, B-J3, C-J1, D-J2.',
    code: 'Generate all worker-job permutations, reject duplicate job columns, and keep the minimum cumulative cost.',
  },
  dijkstra: {
    prompts: ['Find the adjacency matrix.', 'Find the adjacency list.', 'Find the shortest path from A to G using Dijkstra.'],
    answer: 'Shortest path: A -> B -> D -> E -> G. Total distance: 28.',
    code: 'Repeatedly visit the unvisited vertex with the smallest tentative distance and relax its outgoing edges.',
  },
};
