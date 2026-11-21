import React from 'react';

interface Props {
  step: number;
  pct: number;
}

export const ReportProgress: React.FC<Props> = ({ step, pct }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="t-14">
      <span style={{ fontWeight: 600 }}>Paso {step} de 6</span>
      <span style={{ color: 'var(--text2)' }}>{pct} % completado</span>
    </div>
    <div style={{ height: 8, background: 'var(--divider)', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'var(--secondary)', borderRadius: 4, transition: 'width 0.25s ease' }} />
    </div>
  </div>
);
