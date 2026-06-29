import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ExplanationPanel from '../components/simulation/ExplanationPanel.jsx';
import StepController from '../components/simulation/StepController.jsx';
import TimelineSlider from '../components/simulation/TimelineSlider.jsx';
import { useSimulationSettings } from '../context/SimulationContext.jsx';

export default function SimulationWorkspace({ question, part, simulation, onSelectPart, explanationOpen, onCloseExplanation, children }) {
  const { speed, setSpeed } = useSimulationSettings();
  const steps = useMemo(() => simulation.steps || [], [simulation]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = steps[stepIndex] || steps[0];

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [question.questionId, part.part]);

  useEffect(() => {
    if (!playing) return undefined;
    const delay = 900 / speed;
    const timer = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, delay);
    return () => window.clearInterval(timer);
  }, [playing, speed, steps.length]);

  const progress = steps.length <= 1 ? 100 : ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="workspace-grid">
      <section className="canvas-card">
        <div className="canvas-toolbar">
          <div>
            <p className="eyebrow">{question.questionId}({part.part}) · {part.visualizationType}</p>
            <h3>{part.question}</h3>
          </div>
          <StepController
            playing={playing}
            current={stepIndex}
            total={steps.length}
            onPlayPause={() => setPlaying((value) => !value)}
            onPrev={() => setStepIndex((value) => Math.max(0, value - 1))}
            onNext={() => setStepIndex((value) => Math.min(steps.length - 1, value + 1))}
            onReset={() => {
              setPlaying(false);
              setStepIndex(0);
            }}
          />
        </div>
        <div className="subquestion-tabs" aria-label="Sub-question navigation">
          {question.parts.map((item) => (
            <button
              key={item.part}
              className={item.part === part.part ? 'active' : ''}
              onClick={() => onSelectPart(item.part)}
            >
              ({item.part})
            </button>
          ))}
        </div>
        <TimelineSlider current={stepIndex} total={steps.length} onChange={setStepIndex} />
        <div className="progress-track"><motion.span animate={{ width: `${progress}%` }} /></div>
        <motion.div key={`${question.questionId}-${part.part}-${stepIndex}`} className="visual-stage" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {children(step)}
        </motion.div>
      </section>
      <div className="desktop-explanation">
        <ExplanationPanel question={question} part={part} step={step} />
      </div>
      {explanationOpen && (
        <div className="explanation-drawer">
          <button className="mobile-scrim" aria-label="Close explanation" onClick={onCloseExplanation} />
          <aside className="explanation-sheet">
            <div className="mobile-drawer-head">
              <div>
                <p className="eyebrow">Explanation</p>
                <h2>{question.questionId}({part.part})</h2>
              </div>
              <button className="icon-button" onClick={onCloseExplanation} aria-label="Close explanation">
                <X size={18} />
              </button>
            </div>
            <ExplanationPanel question={question} part={part} step={step} />
          </aside>
        </div>
      )}
      <div className="mobile-control-bar">
        <StepController
          playing={playing}
          current={stepIndex}
          total={steps.length}
          compact
          onPlayPause={() => setPlaying((value) => !value)}
          onPrev={() => setStepIndex((value) => Math.max(0, value - 1))}
          onNext={() => setStepIndex((value) => Math.min(steps.length - 1, value + 1))}
          onReset={() => {
            setPlaying(false);
            setStepIndex(0);
          }}
        />
        <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Playback speed">
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
}
