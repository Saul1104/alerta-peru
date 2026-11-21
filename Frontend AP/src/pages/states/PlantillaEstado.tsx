import React from 'react';
import { ScreenId } from '../../types';

interface Props {
  header: string;
  badgeBg: string;
  icon: string;
  title: string;
  desc: string;
  primaryLabel: string;
  primaryTarget: ScreenId;
  secondaryLabel?: string;
  secondaryTarget?: ScreenId;
  onNavigate: (s: ScreenId) => void;
}

export const PlantillaEstado: React.FC<Props> = ({
  header,
  badgeBg,
  icon,
  title,
  desc,
  primaryLabel,
  primaryTarget,
  secondaryLabel,
  secondaryTarget,
  onNavigate,
}) => (
  <div className="page-container auth-container" style={{ alignItems: 'center', textAlign: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <h1 className="t-24" style={{ fontWeight: 700 }}>{header}</h1>
      <button className="proto-chip" onClick={() => onNavigate('ap3-catalogo-estados')}>
        Catálogo de estados
      </button>
    </div>

    <div
      style={{
        width: 96,
        height: 96,
        borderRadius: 48,
        background: badgeBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 28,
      }}
    >
      <img src={icon} alt="" width={44} height={44} />
    </div>

    <h2 className="t-22" style={{ fontWeight: 700 }}>{title}</h2>
    <p className="t-16" style={{ color: 'var(--text2)' }}>{desc}</p>

    <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => onNavigate(primaryTarget)}>
      {primaryLabel}
    </button>
    {secondaryLabel && secondaryTarget && (
      <button className="btn-secondary" onClick={() => onNavigate(secondaryTarget)}>
        {secondaryLabel}
      </button>
    )}
  </div>
);
