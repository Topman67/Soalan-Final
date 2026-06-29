export default function TimelineSlider({ current, total, onChange }) {
  const percentage = total <= 1 ? 100 : (current / (total - 1)) * 100;
  return (
    <div className="timeline-shell">
      <div className="timeline-progress" style={{ width: `${percentage}%` }} />
      <input
        type="range"
        min="0"
        max={Math.max(0, total - 1)}
        value={current}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label="Simulation timeline"
      />
    </div>
  );
}
