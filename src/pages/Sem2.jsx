import { createBinarySteps } from '../engines/binaryEngine.js';
import { createDijkstraSteps } from '../engines/dijkstraEngine.js';
import { createMergeSteps } from '../engines/mergeEngine.js';
import { answerBank, graphEdges, graphNodes, sem2BinaryInput, sem2MergeInput } from '../data/inputs.js';
import BinarySearchViz from '../components/visualizers/search/BinarySearchViz.jsx';
import DijkstraViz from '../components/visualizers/graph/DijkstraViz.jsx';
import MergeSortViz from '../components/visualizers/sorting/MergeSortViz.jsx';
import SimulationWorkspace from './SimulationWorkspace.jsx';

export default function Sem2({ question }) {
  if (question.type === 'merge') {
    const simulation = createMergeSteps(sem2MergeInput);
    return (
      <SimulationWorkspace question={question} answer={answerBank.merge} simulation={simulation}>
        {(step) => <MergeSortViz step={step} />}
      </SimulationWorkspace>
    );
  }

  if (question.type === 'binary-sem2') {
    const simulation = createBinarySteps(sem2BinaryInput, 19);
    return (
      <SimulationWorkspace question={question} answer={answerBank['binary-sem2']} simulation={simulation}>
        {(step) => <BinarySearchViz step={step} />}
      </SimulationWorkspace>
    );
  }

  if (question.type === 'dijkstra') {
    const simulation = createDijkstraSteps(graphNodes, graphEdges, 'A', 'G');
    return (
      <SimulationWorkspace question={question} answer={answerBank.dijkstra} simulation={simulation}>
        {(step) => <DijkstraViz step={step} nodes={graphNodes} edges={graphEdges} />}
      </SimulationWorkspace>
    );
  }

  return (
    <SimulationWorkspace question={question} answer={answerBank['divide-sem2']} simulation={{ steps: [{ id: 0, message: 'Use divide-and-conquer to reduce the exponent and minimum search.', state: 'divide' }] }}>
      {() => <DivideCanvas power="a^(2n)" />}
    </SimulationWorkspace>
  );
}

function DivideCanvas({ power }) {
  return (
    <div className="divide-canvas">
      <div className="recurrence-card">Compute {power}</div>
      <div className="recurrence-path">
        <span>base case n=0</span>
        <span>halve exponent</span>
        <span>combine recursively</span>
      </div>
      <div className="recurrence-card accent">FindMin recurrence: T(n)=2T(n/2)+O(1)=O(n)</div>
    </div>
  );
}
