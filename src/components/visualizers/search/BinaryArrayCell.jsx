import { motion } from 'framer-motion';

export default function BinaryArrayCell({ value, index, role, eliminated, found }) {
  const roleClass = role ? `role-${role}` : '';

  return (
    <motion.div
      layout
      className={`binary-array-cell ${roleClass} ${eliminated ? 'eliminated' : ''} ${found ? 'found' : ''}`}
      animate={{ y: role === 'mid' ? -6 : 0, scale: role || found ? 1.04 : 1, opacity: eliminated ? 0.34 : 1 }}
      transition={{ duration: 0.34, ease: 'easeOut' }}
    >
      <div className="binary-value-box">
        <span>{value}</span>
        {role && <small>{role}</small>}
      </div>
      <div className="binary-index">{index}</div>
    </motion.div>
  );
}
