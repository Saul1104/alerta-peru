import React from 'react';
import { ReportDraft, ScreenId } from '../../types';
import { ReportProgress } from './ProgresoDenuncia';

interface Props {
  isValidationScreen: boolean;
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
}

export const Step2DescriptionPage: React.FC<Props> = ({
  isValidationScreen,
  draft,
  setDraft,
  onNavigate,
}) => {
  const isValidationErr = isValidationScreen || (draft.descripcion.length > 0 && draft.descripcion.length < 10);

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('denuncia-paso-1')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
      </div>

      <ReportProgress step={2} pct={33} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 className="t-22" style={{ fontWeight: 700 }}>Describe lo ocurrido</h2>
        <p className="t-15" style={{ color: 'var(--text2)' }}>
          Incluye los datos que recuerdes.
        </p>
      </div>

      <div className="field-group">
        <label className="field-label">Descripción (obligatorio)</label>
        <textarea
          className={`field-textarea ${isValidationErr ? 'error' : ''}`}
          value={isValidationScreen && draft.descripcion.length >= 10 ? 'Robo' : draft.descripcion}
          onChange={(e) => setDraft((prev) => ({ ...prev, descripcion: e.target.value.slice(0, 500) }))}
          placeholder="Cuenta qué ocurrió con tus palabras…"
        />
        {isValidationErr ? (
          <span className="t-13" style={{ color: 'var(--danger)', fontWeight: 600 }}>
            Error: escribe al menos 10 caracteres para describir lo ocurrido.
          </span>
        ) : (
          <span className="field-help">
            {draft.descripcion.length} de 500 caracteres. Puedes escribir hasta 500.
          </span>
        )}
      </div>

      <div className="responsive-grid-2">
        <div className="field-group">
          <label className="field-label">Fecha (obligatorio)</label>
          <div className="field-box">
            <input
              className="field-input"
              value={draft.fecha}
              onChange={(e) => setDraft((prev) => ({ ...prev, fecha: e.target.value }))}
              placeholder="dd / mm / aaaa"
            />
          </div>
          <span className="field-help">Formato: dd/mm/aaaa</span>
        </div>

        <div className="field-group">
          <label className="field-label">Hora (obligatorio)</label>
          <div className="field-box">
            <input
              className="field-input"
              value={draft.hora}
              onChange={(e) => setDraft((prev) => ({ ...prev, hora: e.target.value }))}
              placeholder="hh:mm"
            />
          </div>
          <span className="field-help">Formato 24 h: hh:mm</span>
        </div>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-3')}>
        Continuar
      </button>
    </div>
  );
};
