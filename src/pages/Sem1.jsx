import { createAssignmentSteps } from '../engines/assignmentEngine.js';
import { createBinarySteps } from '../engines/binaryEngine.js';
import { createBubbleSteps } from '../engines/bubbleEngine.js';
import { assignmentMatrix, sem1BinaryInput, sem1BubbleInput } from '../data/inputs.js';
import AssignmentTreeViz, { AssignmentPartialTreeViz } from '../components/visualizers/tree/AssignmentTreeViz.jsx';
import BinarySearchViz from '../components/visualizers/search/BinarySearchViz.jsx';
import BubbleSortViz from '../components/visualizers/sorting/BubbleSortViz.jsx';
import SimulationWorkspace from './SimulationWorkspace.jsx';

export default function Sem1({ question, part, onSelectPart, explanationOpen, onCloseExplanation }) {
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
      {(step) => renderVisualization(part, step, simulation)}
    </SimulationWorkspace>
  );
}

function createSimulation(part) {
  if (part.engine === 'bubble') return createBubbleSteps(sem1BubbleInput);
  if (part.engine === 'binary-sem1') return createBinarySteps(sem1BinaryInput, 27, { quadratic: part.part === 'a' });
  if (part.engine === 'assignment') return createAssignmentSteps(assignmentMatrix);
  return { steps: [{ id: 0, message: 'Use the answer steps to unfold the divide-and-conquer recurrence.' }] };
}

function renderVisualization(part, step, simulation) {
  if (part.visualizationType === 'search') return <BinarySearchViz step={step} />;
  if (part.visualizationType === 'tree' && part.part === 'a') return <AssignmentPartialTreeViz depth={1} />;
  if (part.visualizationType === 'tree' && part.part === 'b') return <AssignmentPartialTreeViz depth={2} />;
  if (part.visualizationType === 'tree') return <AssignmentTreeViz step={step} leaves={simulation.leaves} bestCost={simulation.bestCost} />;
  if (part.engine === 'divide-sem1') return <DivideCanvas power="a^(5n)" />;
  return <BubbleSortViz step={step} />;
}

function DivideCanvas({ power }) {
  return (
    <div className="divide-canvas">
      <div className="recurrence-card">Compute {power}</div>
      <div className="recurrence-path">
        <span>base case</span>
        <span>divide</span>
        <span>recurse</span>
        <span>combine</span>
      </div>
      <div className="recurrence-card accent">Minimum search: T(n)=2T(n/2)+O(1)=O(n)</div>
    </div>
  );
}
