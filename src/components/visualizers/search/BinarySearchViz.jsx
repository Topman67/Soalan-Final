import BinaryArrayCell from './BinaryArrayCell.jsx';
import BinarySearchExplanation from './BinarySearchExplanation.jsx';
import BinarySearchLegend from './BinarySearchLegend.jsx';

export default function BinarySearchViz({ step }) {
  const values = step?.array || [];

  return (
    <div className="binary-stage">
      <BinarySearchLegend />
      <div className="binary-array-grid">
        {values.map((value, index) => {
          const role = index === step.mid ? 'mid' : index === step.low ? 'low' : index === step.high ? 'high' : '';
          const eliminated = step.eliminatedLeft?.includes(index) || step.eliminatedRight?.includes(index) || index < step.low || index > step.high;
          const found = index === step.mid && step.found;
          return (
            <BinaryArrayCell key={`${value}-${index}`} value={value} index={index} role={role} eliminated={eliminated} found={found} />
          );
        })}
      </div>
      <BinarySearchExplanation step={step} />
    </div>
  );
}
