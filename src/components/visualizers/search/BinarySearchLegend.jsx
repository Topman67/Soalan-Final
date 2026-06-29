const items = [
  ['LOW', 'cyan'],
  ['MID', 'yellow'],
  ['HIGH', 'pink'],
  ['FOUND', 'green'],
  ['ELIMINATED', 'muted'],
];

export default function BinarySearchLegend() {
  return (
    <div className="binary-legend">
      {items.map(([label, color]) => (
        <span key={label}>
          <i className={`legend-dot ${color}`} />
          {label}
        </span>
      ))}
    </div>
  );
}
