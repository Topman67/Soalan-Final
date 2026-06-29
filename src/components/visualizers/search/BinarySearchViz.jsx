import { motion } from 'framer-motion';

export default function BinarySearchViz({ step }) {
  const values = step?.array || [];

  return (
    <div className="binary-stage">
      <div className="binary-grid">
        {values.map((value, index) => {
          const inRange = index >= step.low && index <= step.high;
          const isMid = index === step.mid;
          const isFound = isMid && step.found;
          return (
            <motion.div
              key={value}
              className={`binary-cell ${inRange ? 'in-range' : 'eliminated'} ${isMid ? 'mid' : ''} ${isFound ? 'found' : ''}`}
              animate={{ y: isMid ? -8 : 0, opacity: inRange ? 1 : 0.26 }}
              transition={{ duration: 0.35 }}
            >
              <span>{value}</span>
              {index === step.low && <small>low</small>}
              {isMid && <small>mid</small>}
              {index === step.high && <small>high</small>}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
