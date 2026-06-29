import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Binary,
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Network,
  Route,
  Shuffle,
  Sigma,
  SplitSquareHorizontal,
  Table2,
} from 'lucide-react';
import './styles.css';

const bubbleNumbers = [7, 17, 3, 23, 11, 37, 9, 45, 15, 99];
const mergeNumbers = [9, 15, 5, 23, 11, 37, 3];
const binarySetOne = [1, 2, 4, 5, 6, 7, 8, 9, 27, 13, 15, 16, 18, 19, 20, 22];
const binarySetTwo = [1, 2, 4, 5, 6, 7, 8, 9, 12, 13, 15, 16, 18, 19, 20, 22];

const assignmentMatrix = [
  { worker: 'A', jobs: [9, 8, 7, 8] },
  { worker: 'B', jobs: [7, 4, 3, 4] },
  { worker: 'C', jobs: [5, 6, 1, 8] },
  { worker: 'D', jobs: [6, 2, 9, 7] },
];

const graphNodes = {
  A: { x: 50, y: 8 },
  B: { x: 88, y: 32 },
  C: { x: 13, y: 32 },
  D: { x: 50, y: 32 },
  E: { x: 13, y: 63 },
  F: { x: 88, y: 63 },
  G: { x: 50, y: 88 },
};

const graphEdges = [
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

const bubbleAlgorithm = `BubbleSort(C[1..n])
for i = 1 to n - 1
    for j = 1 to n - i
        if C[j] > C[j + 1]
            temp = C[j]
            C[j] = C[j + 1]
            C[j + 1] = temp
return C`;

const mergeSortAlgorithm = `MergeSort(A, left, right)
if left >= right
    return

mid = floor((left + right) / 2)
MergeSort(A, left, mid)
MergeSort(A, mid + 1, right)
Merge(A, left, mid, right)

Merge(A, left, mid, right)
create leftArray and rightArray
i = 0, j = 0, k = left
while i < leftArray.length and j < rightArray.length
    if leftArray[i] <= rightArray[j]
        A[k] = leftArray[i]
        i = i + 1
    else
        A[k] = rightArray[j]
        j = j + 1
    k = k + 1
copy all remaining elements
return A`;

const binaryBasicAlgorithm = `BinarySearch(A[1..n], target)
low = 1
high = n

while low <= high
    mid = floor((low + high) / 2)
    if A[mid] == target
        return mid
    else if A[mid] < target
        low = mid + 1
    else
        high = mid - 1

return not found`;

const recursiveBinaryAlgorithm = `RecursiveBinarySearch(A, target, low, high)
if low > high
    return not found

mid = floor((low + high) / 2)
if A[mid] == target
    return mid
else if A[mid] < target
    return RecursiveBinarySearch(A, target, mid + 1, high)
else
    return RecursiveBinarySearch(A, target, low, mid - 1)`;

const binaryQuadraticAlgorithm = `BinarySearchQuadratic(A[1..n], target)
sort A in ascending order if needed

for i = 1 to n
    for j = 1 to n
        dummy = A[i]

low = 1
high = n
while low <= high
    mid = floor((low + high) / 2)
    if A[mid] == target
        return mid
    else if A[mid] < target
        low = mid + 1
    else
        high = mid - 1
return not found`;

const recursiveBinaryQuadraticAlgorithm = `RecursiveBinaryQuadratic(A, target, low, high)
for i = low to high
    for j = low to high
        dummy = A[i]

if low > high
    return not found

mid = floor((low + high) / 2)
if A[mid] == target
    return mid
else if A[mid] < target
    return RecursiveBinaryQuadratic(A, target, mid + 1, high)
else
    return RecursiveBinaryQuadratic(A, target, low, mid - 1)`;

const powerFiveAlgorithm = `Power5n(a, n)
if n == 0
    return 1
if n is even
    half = Power5n(a, n / 2)
    return half * half
else
    return a^5 * Power5n(a, n - 1)`;

const powerTwoAlgorithm = `Power2n(a, n)
if n == 0
    return 1
if n is even
    half = Power2n(a, n / 2)
    return half * half
else
    return a^2 * Power2n(a, n - 1)`;

const minimumDivideAlgorithm = `FindMin(X, left, right)
if left == right
    return X[left]

mid = floor((left + right) / 2)
leftMin = FindMin(X, left, mid)
rightMin = FindMin(X, mid + 1, right)

if leftMin < rightMin
    return leftMin
else
    return rightMin`;

const papers = [
  {
    id: 'sem1',
    title: 'Semester I 2025/2026',
    subtitle: 'Bubble sort, binary search, divide-and-conquer, assignment problem',
    sections: [
      { id: 'sort', title: 'Q1 Bubble Sort', icon: Shuffle },
      { id: 'binary', title: 'Q2 Binary Search', icon: Binary },
      { id: 'divide', title: 'Q3 Divide & Conquer', icon: SplitSquareHorizontal },
      { id: 'assignment', title: 'Q4 Assignment Tree', icon: GitBranch },
    ],
  },
  {
    id: 'sem2',
    title: 'Semester II 2024/2025',
    subtitle: 'Merge sort, binary search, divide-and-conquer, weighted graph',
    sections: [
      { id: 'sort', title: 'Q1 Merge Sort', icon: SplitSquareHorizontal },
      { id: 'binary', title: 'Q2 Binary Search', icon: Binary },
      { id: 'divide', title: 'Q3 Divide & Conquer', icon: Sigma },
      { id: 'graph', title: 'Q4 Graph & Dijkstra', icon: Network },
    ],
  },
];

function bubbleSteps(values) {
  const arr = [...values];
  const steps = [{ label: 'Start', values: [...arr], note: 'Read the list from left to right.' }];
  for (let pass = 0; pass < arr.length - 1; pass += 1) {
    let swapped = false;
    for (let i = 0; i < arr.length - pass - 1; i += 1) {
      if (arr[i] > arr[i + 1]) {
        const left = arr[i];
        const right = arr[i + 1];
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        steps.push({
          label: `Pass ${pass + 1}`,
          values: [...arr],
          active: [i, i + 1],
          note: `${left} and ${right} are swapped because ${left} is larger.`,
        });
      }
    }
    if (!swapped) break;
  }
  steps.push({ label: 'Sorted', values: [...arr], note: 'Ascending order is complete.' });
  return steps;
}

function mergeSteps(values) {
  return [
    { label: 'Start', groups: [values], note: 'Split until every group has one item.' },
    { label: 'Split 1', groups: [values.slice(0, 4), values.slice(4)], note: 'Divide the array near the middle.' },
    { label: 'Split 2', groups: [[9, 15], [5, 23], [11, 37], [3]], note: 'Keep dividing both halves.' },
    { label: 'Singles', groups: [[9], [15], [5], [23], [11], [37], [3]], note: 'Base case: one element is already sorted.' },
    { label: 'Merge pairs', groups: [[9, 15], [5, 23], [11, 37], [3]], note: 'Compare front elements and merge small lists.' },
    { label: 'Merge halves', groups: [[5, 9, 15, 23], [3, 11, 37]], note: 'Build larger sorted halves.' },
    { label: 'Sorted', groups: [[3, 5, 9, 11, 15, 23, 37]], note: 'Final merge produces ascending order.' },
  ];
}

function binarySteps(values, target) {
  const sorted = [...values].sort((a, b) => a - b);
  const steps = [];
  let low = 0;
  let high = sorted.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midValue = sorted[mid];
    steps.push({ low, high, mid, midValue, sorted, target });
    if (midValue === target) break;
    if (midValue < target) low = mid + 1;
    else high = mid - 1;
  }
  return steps;
}

function dijkstraSteps() {
  const adjacency = graphEdges.reduce((map, [from, to, weight]) => {
    map[from] = [...(map[from] || []), [to, weight]];
    map[to] = [...(map[to] || []), [from, weight]];
    return map;
  }, {});
  const distances = Object.fromEntries(Object.keys(graphNodes).map((node) => [node, Infinity]));
  const previous = {};
  const visited = new Set();
  const steps = [];
  distances.A = 0;

  while (visited.size < Object.keys(graphNodes).length) {
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
    steps.push({ current, distances: { ...distances }, previous: { ...previous }, visited: [...visited] });
    if (current === 'G') break;
  }
  return steps;
}

function shortestPath(previous, target = 'G') {
  const path = [target];
  let current = target;
  while (previous[current]) {
    current = previous[current];
    path.unshift(current);
  }
  return path;
}

function assignmentLeaves() {
  const jobs = [0, 1, 2, 3];
  const leaves = [];

  function walk(workerIndex, remaining, path, cost) {
    if (workerIndex === assignmentMatrix.length) {
      leaves.push({ path, cost });
      return;
    }

    const row = assignmentMatrix[workerIndex];
    remaining.forEach((jobIndex) => {
      walk(
        workerIndex + 1,
        remaining.filter((item) => item !== jobIndex),
        [...path, `${row.worker}-J${jobIndex + 1}`],
        cost + row.jobs[jobIndex],
      );
    });
  }

  walk(0, jobs, [], 0);
  return leaves.sort((a, b) => a.cost - b.cost);
}

function edgeWeight(a, b) {
  return graphEdges.find(([x, y]) => (x === a && y === b) || (x === b && y === a))?.[2] ?? 0;
}

function graphAdjacencyList() {
  const list = graphEdges.reduce((map, [from, to, weight]) => {
    map[from] = [...(map[from] || []), `${to}(${weight})`];
    map[to] = [...(map[to] || []), `${from}(${weight})`];
    return map;
  }, {});
  return Object.keys(graphNodes).map((node) => [node, list[node] || []]);
}

function formatDistances(distances) {
  return Object.keys(graphNodes).map((node) => `${node}=${distances[node]}`).join(', ');
}

function App() {
  const [paperId, setPaperId] = useState('sem1');
  const paper = papers.find((item) => item.id === paperId);

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#1f2933]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-[#d8d0c3] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[#607466]">
              <BookOpen size={18} />
              BIE 20303 Algorithm and Complexity
            </div>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Exam Question Visualiser</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#59636f] sm:text-base">
              Two interactive pages built from the supplied final exam PDFs, turning each question into a visual study panel.
            </p>
          </div>
          <div className="flex rounded-md border border-[#cfc6b8] bg-white p-1 shadow-sm">
            {papers.map((item) => (
              <button
                key={item.id}
                className={`rounded px-4 py-2 text-sm font-semibold transition ${
                  paperId === item.id ? 'bg-[#1f2933] text-white' : 'text-[#47525f] hover:bg-[#ebe6dc]'
                }`}
                onClick={() => setPaperId(item.id)}
              >
                {item.id === 'sem1' ? 'Page 1' : 'Page 2'}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.section
            key={paper.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="grid gap-5 lg:grid-cols-[280px_1fr]"
          >
            <PaperSidebar paper={paper} />
            <div className="space-y-5">
              <PaperIntro paper={paper} />
              {paper.id === 'sem1' ? <SemesterOne /> : <SemesterTwo />}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}

function PaperSidebar({ paper }) {
  return (
    <aside className="h-fit border border-[#d8d0c3] bg-white p-4 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wide text-[#7b6f61]">Current Exam Paper</div>
      <h2 className="mt-2 text-xl font-bold">{paper.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#59636f]">{paper.subtitle}</p>
      <nav className="mt-5 grid gap-2">
        {paper.sections.map(({ id, title, icon: Icon }) => (
          <a
            key={id}
            href={`#${paper.id}-${id}`}
            className="flex items-center gap-3 rounded border border-transparent px-3 py-2 text-sm font-semibold text-[#334155] hover:border-[#cfc6b8] hover:bg-[#f7f4ee]"
          >
            <Icon size={18} />
            {title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function PaperIntro({ paper }) {
  return (
    <section className="border border-[#d8d0c3] bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1fr_220px] md:items-center">
        <div>
          <h2 className="text-2xl font-bold">{paper.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#59636f]">
            Replay the algorithm steps, inspect input data, and connect each exam subquestion with its expected reasoning.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <Metric label="Questions" value="4" />
          <Metric label="Duration" value="3h" />
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="border border-[#d8d0c3] bg-[#fbfaf7] px-3 py-3">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-semibold uppercase tracking-wide text-[#7b6f61]">{label}</div>
    </div>
  );
}

function SemesterOne() {
  return (
    <>
      <BubbleSortPanel />
      <BinaryPanel
        paper="sem1"
        values={binarySetOne}
        target={27}
        warning="The PDF set is not fully sorted; the visualiser sorts it first because binary search requires ordered data."
      />
      <DividePanel paper="sem1" power="a^(5n)" />
      <AssignmentPanel />
    </>
  );
}

function SemesterTwo() {
  return (
    <>
      <MergeSortPanel />
      <BinaryPanel paper="sem2" values={binarySetTwo} target={19} />
      <DividePanel paper="sem2" power="a^(2n)" />
      <GraphPanel />
    </>
  );
}

function Panel({ id, title, icon: Icon, children }) {
  return (
    <section id={id} className="border border-[#d8d0c3] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded bg-[#1f2933] text-white">
          <Icon size={20} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function StepControls({ index, max, setIndex }) {
  return (
    <div className="flex items-center gap-2">
      <button className="icon-btn" onClick={() => setIndex(Math.max(0, index - 1))} aria-label="Previous step">
        <ChevronLeft size={18} />
      </button>
      <div className="min-w-24 text-center text-sm font-semibold">
        {index + 1} / {max}
      </div>
      <button className="icon-btn" onClick={() => setIndex(Math.min(max - 1, index + 1))} aria-label="Next step">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function BubbleSortPanel() {
  const steps = useMemo(() => bubbleSteps(bubbleNumbers), []);
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const sorted = [...bubbleNumbers].sort((a, b) => a - b);

  return (
    <Panel id="sem1-sort" title="Q1: Bubble Sort Replay" icon={Shuffle}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <QuestionText
          parts={[
            'Write bubble sort for {c1, c2, ..., cn}.',
            'Sort {7, 17, 3, 23, 11, 37, 9, 45, 15, 99}.',
            'Estimate worst-case complexity.',
          ]}
        />
        <StepControls index={index} max={steps.length} setIndex={setIndex} />
      </div>
      <AnswerGrid>
        <AnswerCard title="(a) Bubble sort algorithm">
          <CodeBlock code={bubbleAlgorithm} />
        </AnswerCard>
        <AnswerCard title="(b) Ascending order">
          <p className="answer-line">{sorted.join(', ')}</p>
          <p className="answer-note">Final sorted set: {'{'}{sorted.join(', ')}{'}'}</p>
        </AnswerCard>
        <AnswerCard title="(c) Worst-case complexity">
          <p className="answer-line">O(n^2)</p>
          <p className="answer-note">Worst case happens when the input is reverse sorted. The nested loops compare about n(n - 1) / 2 pairs.</p>
        </AnswerCard>
      </AnswerGrid>
      <NumberBars values={step.values} active={step.active} />
      <Insight label={step.label} text={`${step.note} Worst case: O(n^2) comparisons and swaps.`} />
    </Panel>
  );
}

function NumberBars({ values, active = [] }) {
  const max = Math.max(...values);
  return (
    <div className="mt-5 grid min-h-72 grid-cols-10 items-end gap-2 border border-[#d8d0c3] bg-[#fbfaf7] p-4">
      {values.map((value, idx) => (
        <motion.div
          key={`${value}-${idx}`}
          layout
          className={`flex min-h-10 flex-col items-center justify-end rounded-t ${
            active.includes(idx) ? 'bg-[#e4572e] text-white' : 'bg-[#4f8a8b] text-white'
          }`}
          style={{ height: `${Math.max(24, (value / max) * 230)}px` }}
        >
          <span className="pb-2 text-xs font-bold">{value}</span>
        </motion.div>
      ))}
    </div>
  );
}

function MergeSortPanel() {
  const steps = useMemo(() => mergeSteps(mergeNumbers), []);
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const sorted = [...mergeNumbers].sort((a, b) => a - b);

  return (
    <Panel id="sem2-sort" title="Q1: Merge Sort Split and Merge" icon={SplitSquareHorizontal}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <QuestionText
          parts={[
            'Write merge sort for {a1, a2, ..., an}.',
            'Sort {9, 15, 5, 23, 11, 37, 3}.',
            'Estimate worst-case complexity.',
          ]}
        />
        <StepControls index={index} max={steps.length} setIndex={setIndex} />
      </div>
      <AnswerGrid>
        <AnswerCard title="(a) Merge sort algorithm">
          <CodeBlock code={mergeSortAlgorithm} />
        </AnswerCard>
        <AnswerCard title="(b) Ascending order">
          <p className="answer-note">Input: {'{'}{mergeNumbers.join(', ')}{'}'}</p>
          <p className="answer-line">{sorted.join(', ')}</p>
          <p className="answer-note">Final sorted set: {'{'}{sorted.join(', ')}{'}'}</p>
        </AnswerCard>
        <AnswerCard title="(c) Worst-case complexity">
          <p className="answer-line">O(n log n)</p>
          <p className="answer-note">The array is divided into log n levels, and each level performs O(n) merging work.</p>
        </AnswerCard>
      </AnswerGrid>
      <div className="mt-5 grid gap-3">
        <AnimatePresence mode="popLayout">
          {step.groups.map((group, idx) => (
            <motion.div
              layout
              key={`${step.label}-${idx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-wrap items-center gap-2 border border-[#d8d0c3] bg-[#fbfaf7] p-3"
            >
              {group.map((value) => (
                <span key={`${idx}-${value}`} className="grid h-11 w-11 place-items-center rounded bg-[#6f5e76] text-sm font-bold text-white">
                  {value}
                </span>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Insight label={step.label} text={`${step.note} Worst case: O(n log n).`} />
    </Panel>
  );
}

function BinaryPanel({ paper, values, target, warning }) {
  const steps = useMemo(() => binarySteps(values, target), [values, target]);
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const foundStep = steps.find((item) => item.midValue === target);
  const sortedValues = [...values].sort((a, b) => a - b);
  const isPageOne = paper === 'sem1';
  const isPageTwo = paper === 'sem2';

  return (
    <Panel id={`${paper}-binary`} title={`Q2: Binary Search for ${target}`} icon={Binary}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <QuestionText
          parts={[
            'Construct the basic binary search algorithm.',
            'Construct the recursive version.',
            `Search for ${target} in the given set.`,
          ]}
        />
        <StepControls index={index} max={steps.length} setIndex={setIndex} />
      </div>
      {isPageOne && (
        <AnswerGrid>
          <AnswerCard title="(a) Binary search with O(n^2) complexity">
            <CodeBlock code={binaryQuadraticAlgorithm} />
            <p className="answer-note">The two nested loops force O(n^2), so the overall algorithm is O(n^2) + O(log n) = O(n^2).</p>
          </AnswerCard>
          <AnswerCard title="(b) Recursive version">
            <CodeBlock code={recursiveBinaryQuadraticAlgorithm} />
          </AnswerCard>
          <AnswerCard title="(c) Search result for 27">
            <p className="answer-note">Sorted input used for binary search:</p>
            <p className="answer-line">{sortedValues.join(', ')}</p>
            <p className="answer-note">Search path: {steps.map((item) => item.midValue).join(' -> ')}</p>
            <p className="answer-line">27 is found at sorted index {(foundStep?.mid ?? 0) + 1}.</p>
          </AnswerCard>
        </AnswerGrid>
      )}
      {isPageTwo && (
        <AnswerGrid>
          <AnswerCard title="(a) Basic binary search algorithm">
            <CodeBlock code={binaryBasicAlgorithm} />
          </AnswerCard>
          <AnswerCard title="(b) Recursive binary search">
            <CodeBlock code={recursiveBinaryAlgorithm} />
          </AnswerCard>
          <AnswerCard title="(c) Search result for 19">
            <p className="answer-note">The given set is already sorted:</p>
            <p className="answer-line">{sortedValues.join(', ')}</p>
            <p className="answer-note">Search path: {steps.map((item) => item.midValue).join(' -> ')}</p>
            <p className="answer-line">19 is found at index {(foundStep?.mid ?? 0) + 1}.</p>
            <p className="answer-note">Using 0-based indexing, it is at index {foundStep?.mid ?? 0}.</p>
          </AnswerCard>
        </AnswerGrid>
      )}
      {warning && <div className="mt-4 border-l-4 border-[#e4572e] bg-[#fff7ed] p-3 text-sm font-semibold text-[#8a3414]">{warning}</div>}
      <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-16">
        {step.sorted.map((value, idx) => (
          <motion.div
            key={value}
            className={`grid h-14 place-items-center border text-sm font-bold ${
              idx === step.mid
                ? 'border-[#e4572e] bg-[#e4572e] text-white'
                : idx >= step.low && idx <= step.high
                  ? 'border-[#4f8a8b] bg-[#e4f0ec]'
                  : 'border-[#d8d0c3] bg-[#f1ede5] text-[#8b8174]'
            }`}
            animate={{ scale: idx === step.mid ? 1.08 : 1 }}
          >
            {value}
          </motion.div>
        ))}
      </div>
      <Insight
        label={`Check middle: ${step.midValue}`}
        text={
          step.midValue === target
            ? `${target} found at sorted index ${step.mid}. Complexity: O(log n).`
            : `${step.midValue} is ${step.midValue < target ? 'smaller' : 'larger'} than ${target}, so the next search half is chosen recursively.`
        }
      />
    </Panel>
  );
}

function DividePanel({ paper, power }) {
  const isPageOne = paper === 'sem1';
  const isPageTwo = paper === 'sem2';

  return (
    <Panel id={`${paper}-divide`} title={`Q3: Recursive Divide-and-Conquer ${power}`} icon={BrainCircuit}>
      {isPageOne && (
        <AnswerGrid>
          <AnswerCard title="(a) Recursive algorithm for a^(5n)">
            <CodeBlock code={powerFiveAlgorithm} />
            <p className="answer-note">Since a^(5n) = (a^5)^n, the odd case multiplies by a^5 and reduces n by 1.</p>
          </AnswerCard>
          <AnswerCard title="(b) Lowest value from n integers">
            <CodeBlock code={minimumDivideAlgorithm} />
          </AnswerCard>
          <AnswerCard title="(c) Time complexity">
            <p className="answer-line">T(n) = 2T(n/2) + O(1)</p>
            <p className="answer-note">By the Master Theorem, this gives O(n). The algorithm compares every element through the recursive merge of minima.</p>
          </AnswerCard>
        </AnswerGrid>
      )}
      {isPageTwo && (
        <AnswerGrid>
          <AnswerCard title="(a) Recursive algorithm for a^(2n)">
            <CodeBlock code={powerTwoAlgorithm} />
            <p className="answer-note">Since a^(2n) = (a^2)^n, the odd case multiplies by a^2 and reduces n by 1.</p>
          </AnswerCard>
          <AnswerCard title="(b) Lowest value from n integers">
            <CodeBlock code={minimumDivideAlgorithm} />
          </AnswerCard>
          <AnswerCard title="(c) Time complexity">
            <p className="answer-line">T(n) = 2T(n/2) + O(1)</p>
            <p className="answer-note">The recurrence solves to O(n), because each integer participates in the divide-and-conquer minimum process.</p>
          </AnswerCard>
        </AnswerGrid>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        <ConceptCard title="Power Recurrence" text={`Compute ${power} by splitting the exponent, solving smaller powers, and recombining.`} />
        <ConceptCard title="Minimum Search" text="Split the finite set, find the minimum in each half, then return the smaller result." />
        <ConceptCard title="Time Estimate" text="For minimum search, T(n) = 2T(n/2) + O(1), giving O(n) total comparisons." />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 border border-[#d8d0c3] bg-[#fbfaf7] p-4 text-sm leading-6">
        <code>min(left half)</code>
        <ArrowRight size={18} />
        <code>min(right half)</code>
        <ArrowRight size={18} />
        <code>return smaller(leftMin, rightMin)</code>
      </div>
    </Panel>
  );
}

function AssignmentPanel() {
  const [level, setLevel] = useState(1);
  const leaves = useMemo(() => assignmentLeaves(), []);
  const bestCost = leaves[0].cost;
  const optimalLeaves = leaves.filter((leaf) => leaf.cost === bestCost);
  const branches = [
    ['A-J1', 9],
    ['A-J2', 8],
    ['A-J3', 7],
    ['A-J4', 8],
  ];
  const levelTwo = branches.flatMap(([aLabel, aCost]) => {
    const usedJob = Number(aLabel.at(-1)) - 1;
    return [0, 1, 2, 3]
      .filter((job) => job !== usedJob)
      .map((job) => ({
        path: `${aLabel} -> B-J${job + 1}`,
        cost: aCost + assignmentMatrix[1].jobs[job],
      }));
  });

  return (
    <Panel id="sem1-assignment" title="Q4: Assignment Problem State-Space Tree" icon={GitBranch}>
      <QuestionText
        parts={[
          'Select one element in each worker row.',
          'No two selected elements may share a job column.',
          'Minimize the total cost from the matrix.',
        ]}
      />
      <AnswerGrid>
        <AnswerCard title="(a) Levels 0 and 1">
          <p className="answer-note">Level 0 is the root. Level 1 assigns worker A to one job.</p>
          <p className="answer-line">{'Root -> A-J1(9), A-J2(8), A-J3(7), A-J4(8)'}</p>
        </AnswerCard>
        <AnswerCard title="(b) Levels 0, 1 and 2">
          <p className="answer-note">Level 2 assigns worker B using only remaining jobs.</p>
          <div className="answer-list">
            {levelTwo.map((node) => <span key={node.path}>{node.path} = {node.cost}</span>)}
          </div>
        </AnswerCard>
        <AnswerCard title="(c) Complete state-space tree result">
          <p className="answer-note">All 24 leaf assignments are generated. Minimum total cost is {bestCost}.</p>
          <div className="answer-list">
            {optimalLeaves.map((leaf) => <span key={leaf.path.join('-')}>{leaf.path.join(' -> ')} = {leaf.cost}</span>)}
          </div>
        </AnswerCard>
      </AnswerGrid>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.2fr]">
        <MatrixTable />
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {[1, 2, 4].map((value) => (
              <button
                key={value}
                className={`rounded border px-3 py-2 text-sm font-semibold ${
                  level === value ? 'border-[#1f2933] bg-[#1f2933] text-white' : 'border-[#cfc6b8] bg-white'
                }`}
                onClick={() => setLevel(value)}
              >
                Level {value === 4 ? 'complete' : value}
              </button>
            ))}
          </div>
          <div className="min-h-72 border border-[#d8d0c3] bg-[#fbfaf7] p-4">
            <div className="mx-auto mb-4 w-fit rounded bg-[#1f2933] px-4 py-2 text-sm font-bold text-white">Root: no job assigned</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {branches.map(([label, cost]) => (
                <motion.div key={label} layout className="border border-[#d8d0c3] bg-white p-3 text-center">
                  <div className="text-sm font-bold">{label}</div>
                  <div className="text-xs text-[#59636f]">cost {cost}</div>
                  {level >= 2 && <div className="mt-3 text-xs leading-5 text-[#47525f]">Expand B with remaining jobs</div>}
                </motion.div>
              ))}
            </div>
            {level === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 border border-[#4f8a8b] bg-[#e4f0ec] p-4">
                <div className="font-bold">Best complete assignments</div>
                <div className="mt-2 grid gap-1 text-sm text-[#47525f]">
                  {optimalLeaves.map((leaf) => <span key={leaf.path.join('-')}>{leaf.path.join(' -> ')} = {leaf.cost}</span>)}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {level === 4 && <CompleteAssignmentLeaves leaves={leaves} />}
    </Panel>
  );
}

function MatrixTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="table-cell">Worker</th>
            {[1, 2, 3, 4].map((job) => <th key={job} className="table-cell">Job {job}</th>)}
          </tr>
        </thead>
        <tbody>
          {assignmentMatrix.map((row) => (
            <tr key={row.worker}>
              <th className="table-cell">{row.worker}</th>
              {row.jobs.map((cost, idx) => <td key={idx} className="table-cell">{cost}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompleteAssignmentLeaves({ leaves }) {
  return (
    <div className="mt-5 border border-[#d8d0c3] bg-[#fbfaf7] p-4">
      <div className="mb-3 text-sm font-bold">Complete leaf nodes, sorted by total cost</div>
      <div className="grid max-h-72 gap-2 overflow-y-auto pr-1 text-xs sm:grid-cols-2">
        {leaves.map((leaf) => (
          <div key={leaf.path.join('-')} className={`border p-2 ${leaf.cost === leaves[0].cost ? 'border-[#4f8a8b] bg-[#e4f0ec]' : 'border-[#d8d0c3] bg-white'}`}>
            <span className="font-semibold">{leaf.path.join(' -> ')}</span>
            <span className="ml-2 text-[#59636f]">cost {leaf.cost}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GraphPanel() {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = useMemo(() => dijkstraSteps(), []);
  const step = steps[stepIndex];
  const finalStep = steps[steps.length - 1];
  const finalPath = shortestPath(finalStep.previous);
  const path = shortestPath(step.previous);
  const pathEdges = new Set(path.slice(1).map((node, idx) => [path[idx], node].sort().join('-')));

  return (
    <Panel id="sem2-graph" title="Q4: Weighted Graph, Adjacency, and Dijkstra" icon={Network}>
      <AnswerGrid>
        <AnswerCard title="(a) Adjacency matrix">
          <p className="answer-note">Order of vertices: A, B, C, D, E, F, G. A zero means no direct edge.</p>
          <MiniMatrix />
        </AnswerCard>
        <AnswerCard title="(b) Adjacency list">
          <div className="answer-list">
            {graphAdjacencyList().map(([node, edges]) => <span key={node}>{node}: {edges.join(', ')}</span>)}
          </div>
        </AnswerCard>
        <AnswerCard title="(c) Dijkstra shortest path A to G">
          <p className="answer-line">{finalPath.join(' -> ')}</p>
          <p className="answer-note">Shortest distance = {finalStep.distances.G}</p>
          <p className="answer-note">Final distances: {formatDistances(finalStep.distances)}</p>
        </AnswerCard>
      </AnswerGrid>
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="min-h-[360px] border border-[#d8d0c3] bg-[#fbfaf7] p-4">
            <svg viewBox="0 0 100 100" className="h-[330px] w-full">
              {graphEdges.map(([from, to, weight]) => {
                const a = graphNodes[from];
                const b = graphNodes[to];
                const active = pathEdges.has([from, to].sort().join('-'));
                return (
                  <g key={`${from}-${to}`}>
                    <motion.line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={active ? '#e4572e' : '#333'} strokeWidth={active ? 1.8 : 0.9} />
                    <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 2} textAnchor="middle" className="fill-[#111827] text-[4px] font-bold">
                      {weight}
                    </text>
                  </g>
                );
              })}
              {Object.entries(graphNodes).map(([node, pos]) => (
                <g key={node}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="7"
                    fill={step.visited.includes(node) ? '#4f8a8b' : '#d8d0c3'}
                    stroke="#333"
                    strokeWidth="0.7"
                    animate={{ scale: step.current === node ? 1.12 : 1 }}
                  />
                  <text x={pos.x} y={pos.y + 1.4} textAnchor="middle" className="fill-[#111827] text-[4px] font-bold">
                    {node}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <StepControls index={stepIndex} max={steps.length} setIndex={setStepIndex} />
            <div className="text-sm font-semibold">Current vertex: {step.current}</div>
          </div>
          <Insight label="Shortest path A to G" text={`${path.join(' -> ')} with distance ${step.distances.G === Infinity ? 'pending' : step.distances.G}.`} />
        </div>
        <div className="grid gap-4">
          <AdjacencyMatrix />
          <AdjacencyList />
        </div>
      </div>
    </Panel>
  );
}

function AdjacencyMatrix() {
  const nodes = Object.keys(graphNodes);
  return (
    <div className="overflow-x-auto">
      <div className="mb-2 flex items-center gap-2 text-sm font-bold">
        <Table2 size={16} />
        Adjacency matrix
      </div>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="table-cell"></th>
            {nodes.map((n) => <th key={n} className="table-cell">{n}</th>)}
          </tr>
        </thead>
        <tbody>
          {nodes.map((row) => (
            <tr key={row}>
              <th className="table-cell">{row}</th>
              {nodes.map((col) => <td key={col} className="table-cell">{row === col ? 0 : edgeWeight(row, col)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdjacencyList() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-bold">
        <Route size={16} />
        Adjacency list
      </div>
      <div className="grid gap-2 text-sm">
        {graphAdjacencyList().map(([node, edges]) => (
          <div key={node} className="border border-[#d8d0c3] bg-[#fbfaf7] p-2">
            <strong>{node}</strong>: {edges.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniMatrix() {
  const nodes = Object.keys(graphNodes);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.68rem]">
        <thead>
          <tr>
            <th className="table-cell"></th>
            {nodes.map((node) => <th key={node} className="table-cell">{node}</th>)}
          </tr>
        </thead>
        <tbody>
          {nodes.map((row) => (
            <tr key={row}>
              <th className="table-cell">{row}</th>
              {nodes.map((col) => <td key={col} className="table-cell">{row === col ? 0 : edgeWeight(row, col)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuestionText({ parts }) {
  return (
    <ul className="grid gap-2 text-sm leading-6 text-[#47525f]">
      {parts.map((part) => <li key={part}>- {part}</li>)}
    </ul>
  );
}

function AnswerGrid({ children }) {
  return <div className="mt-5 grid gap-4 lg:grid-cols-3">{children}</div>;
}

function AnswerCard({ title, children }) {
  return (
    <div className="answer-card">
      <h3 className="text-sm font-bold text-[#1f2933]">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

function Insight({ label, text }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 border-l-4 border-[#4f8a8b] bg-[#eef7f4] p-4">
      <div className="text-sm font-bold">{label}</div>
      <p className="mt-1 text-sm leading-6 text-[#47525f]">{text}</p>
    </motion.div>
  );
}

function ConceptCard({ title, text }) {
  return (
    <div className="border border-[#d8d0c3] bg-[#fbfaf7] p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#59636f]">{text}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
