import { motion } from 'framer-motion';
import { pathFromPrevious } from '../../../engines/dijkstraEngine.js';

export default function DijkstraViz({ step, nodes, edges }) {
  const path = pathFromPrevious(step.previous || {});
  const pathEdges = new Set(path.slice(1).map((node, index) => [path[index], node].sort().join('-')));

  return (
    <div className="graph-layout">
      <svg viewBox="0 0 100 100" className="graph-stage">
        {edges.map(([from, to, weight]) => {
          const a = nodes[from];
          const b = nodes[to];
          const active = pathEdges.has([from, to].sort().join('-'));
          return (
            <g key={`${from}-${to}`}>
              <motion.line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={active ? 'graph-edge active' : 'graph-edge'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7 }}
              />
              <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 2} textAnchor="middle" className="edge-label">{weight}</text>
            </g>
          );
        })}
        {Object.entries(nodes).map(([node, pos]) => {
          const visited = step.visited?.includes(node);
          const current = step.current === node;
          return (
            <g key={node}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="7"
                className={`graph-node ${visited ? 'visited' : ''} ${current ? 'current' : ''}`}
                animate={{ scale: current ? 1.18 : 1 }}
              />
              <text x={pos.x} y={pos.y + 1.5} textAnchor="middle" className="node-label">{node}</text>
            </g>
          );
        })}
      </svg>
      <div className="distance-table">
        {Object.entries(step.distances || {}).map(([node, distance]) => (
          <div key={node}>
            <span>{node}</span>
            <strong>{distance === Infinity ? '∞' : distance}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
