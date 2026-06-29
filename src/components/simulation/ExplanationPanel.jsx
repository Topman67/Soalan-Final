import { Eye, Lightbulb, LockKeyhole, Sparkles } from 'lucide-react';
import { useSimulationSettings } from '../../context/SimulationContext.jsx';

export default function ExplanationPanel({ question, part, step }) {
  const { mode } = useSimulationSettings();
  const showAnswers = mode === 'study';

  return (
    <aside className="explanation-panel">
      <div className="panel-header">
        <Sparkles size={18} />
        <span>{question.questionId}({part.part}) Answer Breakdown</span>
      </div>
      <h3>{question.title}</h3>
      <div className="problem-card">
        <span>Problem statement</span>
        <p>{part.question}</p>
      </div>
      <div className="step-message">
        <Lightbulb size={18} />
        <p>{step?.message || 'Start the simulation to inspect each decision.'}</p>
      </div>
      <div className="algorithm-steps">
        <span>Algorithm steps</span>
        <ol>
          {part.answerSteps.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </div>
      {showAnswers ? (
        <div className="answer-reveal">
          <div className="answer-label"><Eye size={16} /> Answer visible</div>
          <p><strong>Final answer:</strong> {part.finalAnswer}</p>
          {part.complexity && <p><strong>Complexity:</strong> {part.complexity}</p>}
          {part.algorithm && <pre><code>{part.algorithm}</code></pre>}
        </div>
      ) : (
        <div className="exam-lock">
          <LockKeyhole size={18} />
          <p>Exam Mode is active. Answers are hidden so you can attempt the question first.</p>
        </div>
      )}
    </aside>
  );
}
