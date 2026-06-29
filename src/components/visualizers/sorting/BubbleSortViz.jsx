import { motion } from 'framer-motion';

export default function BubbleSortViz({ step }) {
  const values = step?.array || [];
  const max = Math.max(...values, 1);

  return (
    <div className="bar-stage">
      {values.map((value, index) => {
        const isActive = step.active?.includes(index);
        const isSwapped = step.swapped?.includes(index);
        const isSorted = step.sorted?.includes(index);
        return (
          <motion.div
            layout
            key={`${value}-${index}`}
            className={`sort-bar ${isSorted ? 'sorted' : ''} ${isActive ? 'active' : ''} ${isSwapped ? 'swapped' : ''}`}
            style={{ height: `${Math.max(36, (value / max) * 300)}px` }}
            transition={{ type: 'spring', stiffness: 190, damping: 22 }}
          >
            <span>{value}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
