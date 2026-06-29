import { createContext, useContext, useMemo, useState } from 'react';

const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [mode, setMode] = useState('study');
  const [speed, setSpeed] = useState(1);

  const value = useMemo(() => ({ mode, setMode, speed, setSpeed }), [mode, speed]);
  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

export function useSimulationSettings() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulationSettings must be used inside SimulationProvider');
  }
  return context;
}
