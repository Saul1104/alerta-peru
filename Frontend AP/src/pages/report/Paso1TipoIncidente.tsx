import React from 'react';
import { ReportDraft, ScreenId } from '../../types';
import { ReportProgress } from './ProgresoDenuncia';

const INCIDENT_TYPES = [
  'Robo o asalto',
  'Accidente de tránsito',
  'Incendio',
  'Emergencia médica',
  'Violencia o agresión',
  'Peligro en la vía pública',
  'Otro',
];

interface Props {
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
}

export const Step1TypePage: React.FC<Props> = ({ draft, setDraft, onNavigate }) => (
  <div className="page-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onNavigate('inicio')}
        style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
      </button>
      <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
    </div>

    <ReportProgress step={1} pct={17} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 className="t-22" style={{ fontWeight: 700 }}>¿Qué sucedió?</h2>
      <p className="t-15" style={{ color: 'var(--text2)' }}>
        Selecciona una opción. Si hay peligro inmediato, llama al 105.
      </p>
    </div>

    <div className="responsive-grid-2">
      {INCIDENT_TYPES.map((t) => {
        const selected = draft.tipo === t;
        return (
          <button
            key={t}
            type="button"
            className={`option-card ${selected ? 'selected' : ''}`}
            onClick={() => setDraft((prev) => ({ ...prev, tipo: t }))}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                border: selected ? '2px solid var(--primary)' : '2px solid var(--border)',
                background: selected ? 'var(--primary)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {selected && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
            </div>
            <span className="t-16" style={{ fontWeight: 500 }}>{t}</span>
          </button>
        );
      })}
    </div>

    <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-2')}>
      Continuar
    </button>
  </div>
);
