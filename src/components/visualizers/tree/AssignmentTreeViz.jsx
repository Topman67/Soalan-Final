import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function AssignmentTreeViz({ step, leaves, bestCost }) {
  const [expanded, setExpanded] = useState(true);
  const previewLeaves = useMemo(() => leaves.slice(0, expanded ? 24 : 6), [leaves, expanded]);
  const activePath = step.tree?.path || [];

  return (
    <div className="assignment-stage">
      <div className="tree-root" onClick={() => setExpanded((value) => !value)}>
        Root
        <small>{expanded ? 'collapse' : 'expand'}</small>
      </div>
      <div className="active-path">
        {activePath.length === 0 && <span className="tree-node active">No assignment · cost 0</span>}
        {activePath.map((node, index) => (
          <motion.span
            key={`${node}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="tree-node active"
          >
            {node} · cost {costAt(activePath.slice(0, index + 1), leaves)}
          </motion.span>
        ))}
      </div>
      <div className="branch-note">Invalid branches are pruned by never allowing two workers to use the same job column.</div>
      <div className="leaf-grid">
        {previewLeaves.map((leaf) => (
          <motion.div
            key={leaf.path.join('-')}
            className={`leaf-node ${leaf.cost === bestCost ? 'best' : 'pruned'}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <strong>{leaf.path.join(' → ')}</strong>
            <span>cost {leaf.cost}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AssignmentPartialTreeViz({ depth = 1 }) {
  const levelOne = [
    { id: 'A-J1', label: 'A -> J1', cost: 9, x: 14 },
    { id: 'A-J2', label: 'A -> J2', cost: 8, x: 38 },
    { id: 'A-J3', label: 'A -> J3', cost: 7, x: 62 },
    { id: 'A-J4', label: 'A -> J4', cost: 8, x: 86 },
  ];
  const bCosts = [7, 4, 3, 4];
  const childOffsets = [-7, 0, 7];
  const levelTwo = levelOne.flatMap((parent, parentIndex) => {
    const remainingJobs = [0, 1, 2, 3].filter((jobIndex) => jobIndex !== parentIndex);
    return remainingJobs.map((jobIndex, childIndex) => ({
      id: `${parent.id}-B-J${jobIndex + 1}`,
      label: `B -> J${jobIndex + 1}`,
      cost: parent.cost + bCosts[jobIndex],
      parent: parent.id,
      x: parent.x + childOffsets[childIndex],
      y: 82 + (childIndex % 2) * 8,
    }));
  });

  return (
    <div className="drawn-tree-stage">
      <svg viewBox="0 0 100 100" className="drawn-tree-svg">
        <TreeNode x={50} y={10} label="Root" cost="0" root />
        {levelOne.map((node) => (
          <g key={node.id}>
            <TreeEdge x1={50} y1={17} x2={node.x} y2={36} />
            <TreeNode x={node.x} y={43} label={node.label} cost={node.cost} />
          </g>
        ))}
        {depth >= 2 && levelTwo.map((node) => {
          const parent = levelOne.find((item) => item.id === node.parent);
          return (
            <g key={node.id}>
              <TreeEdge x1={parent.x} y1={50} x2={node.x} y2={node.y - 7} muted={node.cost > 15} />
              <TreeNode x={node.x} y={node.y} label={node.label} cost={node.cost} muted={node.cost > 15} compact />
            </g>
          );
        })}
      </svg>
      <div className="tree-legend">
        <span>{'Each node is [Worker -> Job | cumulative cost].'}</span>
        <span>{depth === 1 ? 'Q4(a): levels 0 and 1 only.' : 'Q4(b): levels 0, 1 and 2. B only uses remaining jobs.'}</span>
      </div>
    </div>
  );
}

function TreeEdge({ x1, y1, x2, y2, muted = false }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={muted ? 'tree-edge muted' : 'tree-edge'} />;
}

function TreeNode({ x, y, label, cost, root = false, muted = false, compact = false }) {
  const width = compact ? 11 : 16;
  const height = compact ? 8 : 12;
  return (
    <g className={`${root ? 'tree-svg-node root' : 'tree-svg-node'} ${compact ? 'compact' : ''} ${muted ? 'muted' : ''}`}>
      <rect x={x - width / 2} y={y - height / 2} width={width} height={height} rx="2.2" />
      <text x={x} y={y - (compact ? 0.8 : 1.5)} textAnchor="middle">{label}</text>
      <text x={x} y={y + (compact ? 2.4 : 3.5)} textAnchor="middle">cost {cost}</text>
    </g>
  );
}

function costAt(path, leaves) {
  const match = leaves.find((leaf) => path.every((item, index) => leaf.path[index] === item));
  if (!match) return 0;
  const partial = path.length;
  const costs = {
    'A-J1': 9,
    'A-J2': 8,
    'A-J3': 7,
    'A-J4': 8,
    'B-J1': 7,
    'B-J2': 4,
    'B-J3': 3,
    'B-J4': 4,
    'C-J1': 5,
    'C-J2': 6,
    'C-J3': 1,
    'C-J4': 8,
    'D-J1': 6,
    'D-J2': 2,
    'D-J3': 9,
    'D-J4': 7,
  };
  return path.slice(0, partial).reduce((total, item) => total + costs[item], 0);
}
