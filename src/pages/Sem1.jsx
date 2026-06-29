import { createAssignmentSteps } from '../engines/assignmentEngine.js';
import { createBinarySteps } from '../engines/binaryEngine.js';
import { createBubbleSteps } from '../engines/bubbleEngine.js';
import { answerBank, assignmentMatrix, sem1BinaryInput, sem1BubbleInput } from '../data/inputs.js';
import AssignmentTreeViz from '../components/visualizers/tree/AssignmentTreeViz.jsx';
import BinarySearchViz from '../components/visualizers/search/BinarySearchViz.jsx';
import BubbleSortViz from '../components/visualizers/sorting/BubbleSortViz.jsx';
import SimulationWorkspace from './SimulationWorkspace.jsx';

export default function Sem1({ question }) {
  if (question.type === 'bubble') {
    const simulation = createBubbleSteps(sem1BubbleInput);
    return (
      <SimulationWorkspace question={question} answer={answerBank.bubble} simulation={simulation}>
        {(step) => <BubbleSortViz step={step} />}
      </SimulationWorkspace>
    );
  }

  if (question.type === 'binary-sem1') {
    const simulation = createBinarySteps(sem1BinaryInput, 27, { quadratic: true });
    return (
      <SimulationWorkspace question={question} answer={answerBank['binary-sem1']} simulation={simulation}>
        {(step) => <BinarySearchViz step={step} />}
      </SimulationWorkspace>
    );
  }

  if (question.type === 'assignment') {
    const simulation = createAssignmentSteps(assignmentMatrix);
    return (
      <SimulationWorkspace question={question} answer={answerBank.assignment} simulation={simulation}>
        {(step) => <AssignmentTreeViz step={step} leaves={simulation.leaves} bestCost={simulation.bestCost} />}
      </SimulationWorkspace>
    );
  }

  return (
    <SimulationWorkspace question={question} answer={answerBank['divide-sem1']} simulation={{ steps: [{ id: 0, message: 'Study the recurrence, then unfold the recursive calls.', state: 'divide' }] }}>
      {() => <DivideCanvas power="a^(5n)" />}
    </SimulationWorkspace>
  );
}

function DivideCanvas({ power }) {
  return (
    <div className="divide-canvas">
      <div className="recurrence-card">Compute {power}</div>
      <div className="recurrence-path">
        <span>split exponent</span>
        <span>solve subproblem</span>
        <span>combine result</span>
      </div>
      <div className="recurrence-card accent">FindMin: T(n)=2T(n/2)+O(1)=O(n)</div>
    </div>
  );
}
