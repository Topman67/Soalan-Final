import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

export default function StepController({ playing, onPlayPause, onNext, onPrev, onReset, current, total }) {
  return (
    <div className="step-controller">
      <button className="icon-button" onClick={onReset} title="Reset simulation" aria-label="Reset simulation">
        <RotateCcw size={18} />
      </button>
      <button className="icon-button" onClick={onPrev} title="Previous step" aria-label="Previous step">
        <SkipBack size={18} />
      </button>
      <button className="play-button" onClick={onPlayPause} title={playing ? 'Pause' : 'Play'} aria-label={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button className="icon-button" onClick={onNext} title="Next step" aria-label="Next step">
        <SkipForward size={18} />
      </button>
      <span className="step-count">Step {current + 1} / {total}</span>
    </div>
  );
}
