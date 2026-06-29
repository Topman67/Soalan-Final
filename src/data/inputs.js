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
      {
        questionId: 'Q1',
        title: 'Bubble Sort Algorithm',
        visualizationType: 'sorting',
        parts: [
          {
            part: 'a',
            question: 'Write a bubble sort algorithm for a set of numbers {c1, c2, ..., cn}.',
            visualizationType: 'sorting',
            engine: 'bubble',
            answerSteps: [
              'Start from the first element and compare adjacent values.',
              'If the left value is larger than the right value, swap them.',
              'Repeat each pass until the largest remaining value bubbles to its final position.',
              'Stop when all passes are complete or when a pass makes no swaps.',
            ],
            algorithm: `BubbleSort(C[1..n])
for i = 1 to n - 1
  for j = 1 to n - i
    if C[j] > C[j + 1]
      swap C[j], C[j + 1]
return C`,
            finalAnswer: 'Bubble sort repeatedly compares adjacent elements and swaps them until the list is sorted.',
            complexity: 'Worst case: O(n^2). Best case with early stop: O(n).',
          },
          {
            part: 'b',
            question: 'Using the algorithm in Q1(a), sort {7, 17, 3, 23, 11, 37, 9, 45, 15, 99} in ascending order.',
            visualizationType: 'sorting',
            engine: 'bubble',
            answerSteps: [
              'Apply bubble sort to the full list.',
              'After repeated adjacent swaps, smaller values move left and larger values move right.',
              'The final ascending sequence is obtained after all necessary passes.',
            ],
            finalAnswer: '{3, 7, 9, 11, 15, 17, 23, 37, 45, 99}',
            complexity: 'This run follows the same O(n^2) worst-case comparison pattern.',
          },
          {
            part: 'c',
            question: 'Estimate the worst-case complexity of bubble sort.',
            visualizationType: 'sorting',
            engine: 'bubble',
            answerSteps: [
              'Worst case occurs when the input is reverse sorted.',
              'The algorithm performs nested passes over the array.',
              'The number of comparisons is approximately n(n - 1) / 2.',
            ],
            finalAnswer: 'Worst-case complexity of Bubble Sort is O(n²) because it performs approximately n(n−1)/2 comparisons and swaps when the input is in reverse order.',
            complexity: 'O(n²)',
          },
        ],
      },
      {
        questionId: 'Q2',
        title: 'Binary Search with Modified Complexity Task',
        visualizationType: 'search',
        parts: [
          {
            part: 'a',
            question: 'Construct a binary search algorithm with complexity O(n^2).',
            visualizationType: 'search',
            engine: 'binary-sem1',
            answerSteps: [
              'Prepare the data in sorted order because binary search requires sorted input.',
              'Add a nested-loop preprocessing pass to force O(n^2) work.',
              'After preprocessing, run the normal binary search loop.',
            ],
            algorithm: `BinarySearchQuadratic(A, target)
sort A if needed
for i = 1 to n
  for j = 1 to n
    dummy = A[i]
run standard binary search`,
            finalAnswer: 'The overall complexity becomes O(n^2) + O(log n) = O(n^2).',
            complexity: 'Time: O(n^2), Space: O(1).',
          },
          {
            part: 'b',
            question: 'Construct the recursive binary search algorithm based on Q2(a).',
            visualizationType: 'search',
            engine: 'binary-sem1',
            answerSteps: [
              'Use low and high boundaries to describe the current search range.',
              'Compute mid and compare A[mid] with the target.',
              'Recurse into the left half or right half.',
              'Include the O(n^2) preprocessing requirement before the recursive search begins.',
            ],
            algorithm: `RecursiveBinarySearch(A, target, low, high)
if low > high return not found
mid = floor((low + high) / 2)
if A[mid] == target return mid
if A[mid] < target search right half
else search left half`,
            finalAnswer: 'The recursive version repeatedly halves the search interval until the target is found or the range is empty.',
            complexity: 'Recursive search alone is O(log n); with required preprocessing, total is O(n^2).',
          },
          {
            part: 'c',
            question: 'Search number 27 in {1, 2, 4, 5, 6, 7, 8, 9, 27, 13, 15, 16, 18, 19, 20, 22}.',
            visualizationType: 'search',
            engine: 'binary-sem1',
            answerSteps: [
              'Sort the set first: {1, 2, 4, 5, 6, 7, 8, 9, 13, 15, 16, 18, 19, 20, 22, 27}.',
              'Check middle values through binary search.',
              'The search path is 9 -> 19 -> 22 -> 27.',
            ],
            finalAnswer: '27 is found at position 16 using 1-based indexing.',
            complexity: 'Search phase: O(log n).',
          },
          {
            part: 'd',
            question: 'Estimate the worst-case complexity of standard Binary Search.',
            visualizationType: 'search',
            engine: 'binary-sem1',
            answerSteps: [
              'Start with the full sorted search space.',
              'At each comparison, discard half of the remaining elements.',
              'Continue until the element is found or only one possible element remains.',
            ],
            finalAnswer: 'Worst-case time complexity of Binary Search is O(log n) because the algorithm repeatedly divides the search space by half until the element is found or the array size becomes 1.',
            complexity: 'O(log n)',
          },
        ],
      },
      {
        questionId: 'Q3',
        title: 'Divide and Conquer',
        visualizationType: 'sorting',
        parts: [
          {
            part: 'a',
            question: 'Write a recursive algorithm to compute a^(5n), where a is nonzero and n is nonnegative.',
            visualizationType: 'sorting',
            engine: 'divide-sem1',
            answerSteps: [
              'Rewrite a^(5n) as (a^5)^n.',
              'Use n = 0 as the base case and return 1.',
              'For even n, solve half the exponent and square it.',
              'For odd n, multiply by a^5 and reduce n by 1.',
            ],
            algorithm: `Power5n(a, n)
if n == 0 return 1
if n is even
  half = Power5n(a, n / 2)
  return half * half
return a^5 * Power5n(a, n - 1)`,
            finalAnswer: 'A recursive divide-and-conquer exponentiation algorithm can compute a^(5n).',
            complexity: 'Using halving recurrence: O(log n).',
          },
          {
            part: 'b',
            question: 'Find the lowest value of x from a finite set of n integers.',
            visualizationType: 'sorting',
            engine: 'divide-sem1',
            answerSteps: [
              'Divide the set into left and right halves.',
              'Recursively find the minimum in each half.',
              'Return the smaller of the two minima.',
            ],
            algorithm: `FindMin(X, left, right)
if left == right return X[left]
mid = floor((left + right) / 2)
return min(FindMin(left, mid), FindMin(mid + 1, right))`,
            finalAnswer: 'The lowest value is found by recursively comparing the minimum of each half.',
            complexity: 'Time: O(n), Space: O(log n) recursion stack.',
          },
          {
            part: 'c',
            question: 'Estimate the time complexity based on Q3(b).',
            visualizationType: 'sorting',
            engine: 'divide-sem1',
            answerSteps: [
              'The recurrence is T(n) = 2T(n/2) + O(1).',
              'There are n leaf elements and constant work per merge.',
              'Therefore total time is linear.',
            ],
            finalAnswer: 'The time complexity is O(n).',
            complexity: 'T(n)=2T(n/2)+O(1)=O(n).',
          },
        ],
      },
      {
        questionId: 'Q4',
        title: 'Assignment Problem State-Space Tree',
        visualizationType: 'tree',
        parts: [
          {
            part: 'a',
            question: 'Draw levels 0 and 1 of the state-space tree.',
            visualizationType: 'tree',
            engine: 'assignment',
            answerSteps: [
              'Level 0 is the root with no assignments.',
              'Level 1 assigns worker A to each possible job.',
              'Branches: A-J1 cost 9, A-J2 cost 8, A-J3 cost 7, A-J4 cost 8.',
            ],
            finalAnswer: 'Root -> {A-J1(9), A-J2(8), A-J3(7), A-J4(8)}.',
            complexity: 'Tree branching begins with 4 choices.',
          },
          {
            part: 'b',
            question: 'Draw levels 0, 1 and 2 of the state-space tree.',
            visualizationType: 'tree',
            engine: 'assignment',
            answerSteps: [
              'Expand each A assignment by assigning worker B to a remaining job.',
              'Do not reuse a job column already selected by A.',
              'Each level-2 node stores the cumulative cost of A plus B.',
            ],
            finalAnswer: 'Level 2 contains all valid A/B assignment pairs with no repeated job column.',
            complexity: 'There are 4 x 3 = 12 valid level-2 nodes.',
          },
          {
            part: 'c',
            question: 'Draw the complete state-space tree.',
            visualizationType: 'tree',
            engine: 'assignment',
            answerSteps: [
              'Expand all workers A, B, C, and D while avoiding repeated job columns.',
              'Compute cumulative cost at every node.',
              'Highlight the leaf or leaves with minimum total cost.',
            ],
            finalAnswer: 'Minimum cost is 18: A-J3 -> B-J4 -> C-J1 -> D-J2 or A-J4 -> B-J3 -> C-J1 -> D-J2.',
            complexity: 'Complete search has 4! = 24 leaf assignments.',
          },
        ],
      },
    ],
  },
  {
    id: 'sem2',
    label: 'Page 2',
    title: 'Semester II 2024/2025',
    subtitle: 'Merge sort, binary search, divide-and-conquer, weighted graph',
    questions: [
      {
        questionId: 'Q1',
        title: 'Merge Sort Algorithm',
        visualizationType: 'sorting',
        parts: [
          {
            part: 'a',
            question: 'Write a merge sort algorithm for a set of numbers {a1, a2, ..., an}.',
            visualizationType: 'sorting',
            engine: 'merge',
            answerSteps: [
              'Divide the array into two halves.',
              'Recursively sort each half.',
              'Merge the sorted halves into one sorted array.',
            ],
            algorithm: `Pseudocode
MergeSort(A)

    if length(A) <= 1
        return A

    mid = length(A) / 2

    Left = A[0 ... mid-1]
    Right = A[mid ... n]

    Left = MergeSort(Left)
    Right = MergeSort(Right)

    return Merge(Left, Right)

Merge Function
Merge(L, R)

    create empty array Result

    while L is not empty AND R is not empty
        if L[0] <= R[0]
            append L[0] to Result
            remove L[0]
        else
            append R[0] to Result
            remove R[0]

    append remaining elements of L
    append remaining elements of R

    return Result`,
            finalAnswer: 'Merge sort divides the array into left and right halves, recursively sorts both halves, and combines them using the Merge function.',
            complexity: 'Worst case: O(n log n).',
          },
          {
            part: 'b',
            question: 'Use merge sort to sort {9, 15, 5, 23, 11, 37, 3} in ascending order.',
            visualizationType: 'sorting',
            engine: 'merge',
            answerSteps: [
              'Split the list into smaller sublists.',
              'Sort each one-element base case.',
              'Merge them back in ascending order.',
            ],
            finalAnswer: '{3, 5, 9, 11, 15, 23, 37}',
            complexity: 'Sorting this list follows O(n log n).',
          },
          {
            part: 'c',
            question: 'Estimate the worst-case complexity of merge sort.',
            visualizationType: 'sorting',
            engine: 'merge',
            answerSteps: [
              'The array is divided into two halves recursively, creating log n levels.',
              'At each level, merging takes linear time O(n).',
              'Therefore, total time complexity is O(n log n).',
            ],
            finalAnswer: 'The time complexity of Merge Sort is O(n log n). This is because the array is divided into two halves recursively, giving log n levels. At each level, merging takes linear time O(n). Therefore, total time complexity = O(n log n).',
            complexity: 'O(n log n)',
          },
        ],
      },
      {
        questionId: 'Q2',
        title: 'Binary Search Algorithm',
        visualizationType: 'search',
        parts: [
          {
            part: 'a',
            question: 'Construct the basic algorithm of a binary search algorithm.',
            visualizationType: 'search',
            engine: 'binary-sem2',
            answerSteps: [
              'Set low to the first index and high to the last index.',
              'Compute the middle index.',
              'If the middle value is the target, return it.',
              'Otherwise search the half that can contain the target.',
            ],
            algorithm: `BinarySearch(A, target)
low = 1, high = n
while low <= high
  mid = floor((low + high) / 2)
  compare A[mid] with target`,
            finalAnswer: 'Binary search repeatedly halves a sorted search range.',
            complexity: 'Time: O(log n).',
          },
          {
            part: 'b',
            question: 'Construct the recursive algorithm of binary search from Q2(a).',
            visualizationType: 'search',
            engine: 'binary-sem2',
            answerSteps: [
              'Use a base case when low is greater than high.',
              'Compute mid and compare the target.',
              'Call the same function on the left or right half.',
            ],
            algorithm: `RecursiveBinarySearch(A, target, low, high)
if low > high return not found
mid = floor((low + high) / 2)
if A[mid] == target return mid
if A[mid] < target search right
else search left`,
            finalAnswer: 'The recursive binary search performs the same halving logic through function calls.',
            complexity: 'Time: O(log n), recursion stack: O(log n).',
          },
          {
            part: 'c',
            question: 'Use recursive binary search to search number 19 in the given set.',
            visualizationType: 'search',
            engine: 'binary-sem2',
            answerSteps: [
              'The set is already sorted.',
              'Check middle value 9, then move right.',
              'Check 16, then move right.',
              'Check 19 and stop.',
            ],
            finalAnswer: '19 is found at position 14 using 1-based indexing.',
            complexity: 'Search phase: O(log n).',
          },
          {
            part: 'd',
            question: 'Estimate the worst-case complexity of Binary Search.',
            visualizationType: 'search',
            engine: 'binary-sem2',
            answerSteps: [
              'Start with the full sorted search space.',
              'At each comparison, discard half of the remaining elements.',
              'Continue until the element is found or the array size becomes 1.',
            ],
            finalAnswer: 'Worst-case time complexity of Binary Search is O(log n) because the algorithm repeatedly divides the search space by half until the element is found or the array size becomes 1.',
            complexity: 'O(log n)',
          },
        ],
      },
      {
        questionId: 'Q3',
        title: 'Divide and Conquer Algorithms',
        visualizationType: 'sorting',
        parts: [
          {
            part: 'a',
            question: 'Write a recursive divide-and-conquer algorithm to compute a^(2n).',
            visualizationType: 'sorting',
            engine: 'divide-sem2',
            answerSteps: [
              'Rewrite a^(2n) as (a^2)^n.',
              'Return 1 when n = 0.',
              'For even n, recursively solve half and square it.',
              'For odd n, multiply by a^2 and reduce n.',
            ],
            algorithm: `Power2n(a, n)
if n == 0 return 1
if n is even return Power2n(a, n/2)^2
return a^2 * Power2n(a, n - 1)`,
            finalAnswer: 'The recursive algorithm computes a^(2n) using exponent reduction.',
            complexity: 'Using halving recurrence: O(log n).',
          },
          {
            part: 'b',
            question: 'Find the lowest value of x from a finite set of n integers.',
            visualizationType: 'sorting',
            engine: 'divide-sem2',
            answerSteps: [
              'Split the set into two halves.',
              'Recursively find the minimum from each half.',
              'Return the smaller of both results.',
            ],
            finalAnswer: 'The lowest value is obtained by recursively comparing subproblem minima.',
            complexity: 'Time: O(n).',
          },
          {
            part: 'c',
            question: 'Estimate the time complexity of the algorithm in Q3(b).',
            visualizationType: 'sorting',
            engine: 'divide-sem2',
            answerSteps: [
              'The recurrence is T(n)=2T(n/2)+O(1).',
              'All n elements must still be inspected.',
              'The total work is linear.',
            ],
            finalAnswer: 'The time complexity is O(n).',
            complexity: 'T(n)=2T(n/2)+O(1)=O(n).',
          },
        ],
      },
      {
        questionId: 'Q4',
        title: 'Graph Theory Weighted Graph',
        visualizationType: 'graph',
        parts: [
          {
            part: 'a',
            question: 'Find the adjacency matrix of the weighted graph.',
            visualizationType: 'graph',
            engine: 'dijkstra',
            answerSteps: [
              'Use vertex order A, B, C, D, E, F, G.',
              'Place each edge weight at matrix positions (u, v) and (v, u).',
              'Use 0 when there is no direct edge.',
            ],
            finalAnswer: 'The adjacency matrix is shown in the right panel and graph visualisation.',
            complexity: 'Matrix representation uses O(V^2) space.',
          },
          {
            part: 'b',
            question: 'Find the adjacency list of the weighted graph.',
            visualizationType: 'graph',
            engine: 'dijkstra',
            answerSteps: [
              'For each vertex, list directly connected neighbours.',
              'Write the edge weight beside each neighbour.',
              'Because the graph is undirected, list each edge in both endpoints.',
            ],
            finalAnswer: 'A: B(4), C(8); B: A(4), D(7); C: A(8), D(10); D: C(10), B(7), E(12), F(19); E: D(12), F(11), G(5); F: D(19), E(11), G(9); G: E(5), F(9).',
            complexity: 'Adjacency list representation uses O(V + E) space.',
          },
          {
            part: 'c',
            question: 'Find the shortest path from A to G using Dijkstra’s algorithm.',
            visualizationType: 'graph',
            engine: 'dijkstra',
            answerSteps: [
              'Start from A with distance 0.',
              'Repeatedly visit the unvisited vertex with smallest tentative distance.',
              'Relax all outgoing edges.',
              'Stop when G has the shortest settled distance.',
            ],
            finalAnswer: 'Shortest path is A -> B -> D -> E -> G with total distance 28.',
            complexity: 'With a simple implementation: O(V^2). With a priority queue: O((V+E) log V).',
          },
        ],
      },
    ],
  },
];
