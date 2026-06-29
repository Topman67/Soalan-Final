export default function BinarySearchExplanation({ step }) {
  if (!step) return null;

  return (
    <div className="binary-explanation-card">
      <div>
        <span>Target</span>
        <strong>{step.target}</strong>
      </div>
      <div>
        <span>Current comparison</span>
        <strong>{step.comparison || 'Preparing search'}</strong>
      </div>
      <div>
        <span>Decision</span>
        <strong>{step.decision || step.message}</strong>
      </div>
      <div>
        <span>Range</span>
        <strong>low {step.low} · mid {step.mid ?? '-'} · high {step.high}</strong>
      </div>
    </div>
  );
}
