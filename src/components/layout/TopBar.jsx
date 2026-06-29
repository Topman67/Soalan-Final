import { Gauge, Menu, Moon, PanelRightOpen, TimerReset } from 'lucide-react';
import { useSimulationSettings } from '../../context/SimulationContext.jsx';

export default function TopBar({ paper, question, part, onOpenNav, onOpenExplanation }) {
  const { mode, setMode, speed, setSpeed } = useSimulationSettings();

  return (
    <header className="topbar">
      <button className="mobile-top-button" onClick={onOpenNav} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <div>
        <p className="eyebrow">{paper.title}</p>
        <h2>{question.questionId}({part.part}) · {question.title}</h2>
      </div>
      <div className="topbar-actions">
        <div className="segmented" aria-label="Mode switch">
          <button className={mode === 'study' ? 'active' : ''} onClick={() => setMode('study')}>Study</button>
          <button className={mode === 'exam' ? 'active' : ''} onClick={() => setMode('exam')}>Exam</button>
        </div>
        <label className="speed-control" title="Simulation speed">
          <Gauge size={17} />
          <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
          </select>
        </label>
        <div className="status-chip"><Moon size={16} /> Dark</div>
        <div className="status-chip"><TimerReset size={16} /> Live</div>
        <button className="mobile-top-button" onClick={onOpenExplanation} aria-label="Open explanation">
          <PanelRightOpen size={20} />
        </button>
      </div>
    </header>
  );
}
