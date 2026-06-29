import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function AssignmentTreeViz({ step, leaves, bestCost }) {
  const [expanded, setExpanded] = useState(true);
  const previewLeaves = useMemo(() => leaves.slice(0, expanded ? 24 : 6), [leaves, expanded]);

  return (
    <div className="assignment-stage">
      <div className="tree-root" onClick={() => setExpanded((value) => !value)}>
        Root
        <small>{expanded ? 'collapse' : 'expand'}</small>
      </div>
      <div className="active-path">
        {(step.tree?.path || []).map((node, index) => (
          <motion.span
            key={`${node}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="tree-node active"
          >
            {node}
          </motion.span>
        ))}
      </div>
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
