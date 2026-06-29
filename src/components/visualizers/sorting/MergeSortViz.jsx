import { motion } from 'framer-motion';

export default function MergeSortViz({ step }) {
  const groups = step?.groups || [];

  return (
    <div className="merge-stage">
      {groups.map((group, groupIndex) => (
        <motion.div
          layout
          key={`${group.join('-')}-${groupIndex}`}
          className={`merge-group ${step.active?.includes(groupIndex) ? 'active' : ''}`}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="merge-line" />
          {group.map((value, index) => (
            <motion.span layout key={`${value}-${index}`} className="merge-token">
              {value}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
