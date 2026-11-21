import React from 'react';
import { ReportDraft, ScreenId } from '../../types';
import { ReportProgress } from './ProgresoDenuncia';

interface Props {
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
}

export const Step5PrivacyPage: React.FC<Props> = ({ draft, setDraft, onNavigate }) => (
  <div className="page-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onNavigate('denuncia-paso-4')}
        style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
      </button>
      <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
    </div>

    <ReportProgress step={5} pct={83} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 className="t-22" style={{ fontWeight: 700 }}>Protege tu identidad</h2>
      <p className="t-15" style={{ color: 'var(--text2)' }}>
        Elige cómo quieres enviar el reporte.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button
        type="button"
        className={`option-card ${draft.identidad === 'anonima' ? 'selected' : ''}`}
        onClick={() => setDraft((prev) => ({ ...prev, identidad: 'anonima' }))}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            border: draft.identidad === 'anonima' ? '2px solid var(--primary)' : '2px solid var(--border)',
            background: draft.identidad === 'anonima' ? 'var(--primary)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {draft.identidad === 'anonima' && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
        </div>
        <div>
          <p className="t-16" style={{ fontWeight: 500 }}>Enviar de forma anónima</p>
          <p className="t-13" style={{ color: 'var(--text2)' }}>Tu nombre y datos no se mostrarán.</p>
        </div>
      </button>

      <button
        type="button"
        className={`option-card ${draft.identidad === 'compartir' ? 'selected' : ''}`}
        onClick={() => setDraft((prev) => ({ ...prev, identidad: 'compartir' }))}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            border: draft.identidad === 'compartir' ? '2px solid var(--primary)' : '2px solid var(--border)',
            background: draft.identidad === 'compartir' ? 'var(--primary)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {draft.identidad === 'compartir' && <img src="/assets/check-white.svg" alt="" width={14} height={14} />}
        </div>
        <div>
          <p className="t-16" style={{ fontWeight: 500 }}>Compartir mis datos de contacto</p>
          <p className="t-13" style={{ color: 'var(--text2)' }}>La autoridad podrá comunicarse contigo.</p>
        </div>
      </button>
    </div>

    <div className="alert-box alert-info">
      <img src="/assets/alert-info.svg" alt="" width={24} height={24} />
      <p className="t-14">
        Protegida por la Ley 29733. Tu información nunca se muestra en el mapa.
      </p>
    </div>

    {draft.identidad === 'compartir' && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p className="t-16" style={{ fontWeight: 700 }}>Datos de contacto (opcional)</p>
        <div className="responsive-grid-2">
          <div className="field-group">
            <label className="field-label">Teléfono</label>
            <div className="field-box">
              <input
                className="field-input"
                value={draft.telefono}
                onChange={(e) => setDraft((prev) => ({ ...prev, telefono: e.target.value }))}
                placeholder="+51 999 000 000"
              />
            </div>
          </div>
          <div className="field-group">
            <label className="field-label">Correo</label>
            <div className="field-box">
              <input
                className="field-input"
                value={draft.correo}
                onChange={(e) => setDraft((prev) => ({ ...prev, correo: e.target.value }))}
                placeholder="maria.valdez@example.com"
              />
            </div>
          </div>
        </div>
      </div>
    )}

    <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-6')}>
      Continuar
    </button>
  </div>
);
