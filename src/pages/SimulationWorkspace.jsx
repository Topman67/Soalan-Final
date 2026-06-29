import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ExplanationPanel from '../components/simulation/ExplanationPanel.jsx';
import StepController from '../components/simulation/StepController.jsx';
import TimelineSlider from '../components/simulation/TimelineSlider.jsx';
import { useSimulationSettings } from '../context/SimulationContext.jsx';

export default function SimulationWorkspace({ question, answer, simulation, children }) {
  const { speed } = useSimulationSettings();
  const steps = useMemo(() => simulation.steps || [], [simulation]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = steps[stepIndex] || steps[0];

  useEffect(() => {
    setStepIndex(0);
    setPlaying(false);
  }, [question.id]);

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
            <p className="eyebrow">Interactive Canvas</p>
            <h3>{question.title}</h3>
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
        <TimelineSlider current={stepIndex} total={steps.length} onChange={setStepIndex} />
        <div className="progress-track"><motion.span animate={{ width: `${progress}%` }} /></div>
        <motion.div key={`${question.id}-${stepIndex}`} className="visual-stage" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {children(step)}
        </motion.div>
      </section>
      <ExplanationPanel title={question.title} prompts={answer.prompts} answer={answer.answer} code={answer.code} step={step} />
    </div>
  );
}
