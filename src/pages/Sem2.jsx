import { createBinarySteps } from '../engines/binaryEngine.js';
import { createDijkstraSteps } from '../engines/dijkstraEngine.js';
import { createMergeSteps } from '../engines/mergeEngine.js';
import { graphEdges, graphNodes, sem2BinaryInput, sem2MergeInput } from '../data/inputs.js';
import BinarySearchViz from '../components/visualizers/search/BinarySearchViz.jsx';
import DijkstraViz from '../components/visualizers/graph/DijkstraViz.jsx';
import MergeSortViz from '../components/visualizers/sorting/MergeSortViz.jsx';
import SimulationWorkspace from './SimulationWorkspace.jsx';

export default function Sem2({ question, part, onSelectPart, explanationOpen, onCloseExplanation }) {
  const simulation = createSimulation(part);

  return (
    <SimulationWorkspace
      question={question}
      part={part}
      simulation={simulation}
      onSelectPart={onSelectPart}
      explanationOpen={explanationOpen}
      onCloseExplanation={onCloseExplanation}
    >
      {(step) => renderVisualization(part, step)}
    </SimulationWorkspace>
  );
}

function createSimulation(part) {
  if (part.engine === 'merge') return createMergeSteps(sem2MergeInput);
  if (part.engine === 'binary-sem2') return createBinarySteps(sem2BinaryInput, 19);
  if (part.engine === 'dijkstra') return createDijkstraSteps(graphNodes, graphEdges, 'A', 'G');
  return { steps: [{ id: 0, message: 'Use the answer steps to unfold the divide-and-conquer recurrence.' }] };
}

function renderVisualization(part, step) {
  if (part.visualizationType === 'search') return <BinarySearchViz step={step} />;
  if (part.visualizationType === 'graph') return <DijkstraViz step={step} nodes={graphNodes} edges={graphEdges} />;
  if (part.engine === 'divide-sem2') return <DivideCanvas power="a^(2n)" />;
  return <MergeSortViz step={step} />;
}

function DivideCanvas({ power }) {
  return (
    <div className="divide-canvas">
      <div className="recurrence-card">Compute {power}</div>
      <div className="recurrence-path">
        <span>base case</span>
        <span>halve exponent</span>
        <span>recursive result</span>
        <span>combine</span>
      </div>
      <div className="recurrence-card accent">Minimum search: T(n)=2T(n/2)+O(1)=O(n)</div>
    </div>
  );
}
