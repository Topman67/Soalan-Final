import { Eye, Lightbulb, LockKeyhole, Sparkles } from 'lucide-react';
import { useSimulationSettings } from '../../context/SimulationContext.jsx';

export default function ExplanationPanel({ title, prompts, answer, code, step }) {
  const { mode } = useSimulationSettings();
  const showAnswers = mode === 'study';

  return (
    <aside className="explanation-panel">
      <div className="panel-header">
        <Sparkles size={18} />
        <span>Step Intelligence</span>
      </div>
      <h3>{title}</h3>
      <div className="step-message">
        <Lightbulb size={18} />
        <p>{step?.message || 'Start the simulation to inspect each decision.'}</p>
      </div>
      <div className="prompt-list">
        {prompts.map((prompt) => <p key={prompt}>{prompt}</p>)}
      </div>
      {showAnswers ? (
        <div className="answer-reveal">
          <div className="answer-label"><Eye size={16} /> Answer visible</div>
          <p>{answer}</p>
          {code && <pre><code>{code}</code></pre>}
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
