import React from 'react';
import { ModalType, ReportDraft, ScreenId } from '../../types';
import { ReportProgress } from './ProgresoDenuncia';

const DISTRICTS = [
  'Miraflores, Lima',
  'San Isidro, Lima',
  'Santiago de Surco, Lima',
  'Barranco, Lima',
  'Lince, Lima',
  'Cercado de Lima',
];

interface Props {
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

export const Step3LocationPage: React.FC<Props> = ({
  draft,
  setDraft,
  onNavigate,
  onOpenModal,
}) => (
  <div className="page-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onNavigate('denuncia-paso-2')}
        style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
      </button>
      <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
    </div>

    <ReportProgress step={3} pct={50} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 className="t-22" style={{ fontWeight: 700 }}>Ubicación</h2>
      <p className="t-15" style={{ color: 'var(--text2)' }}>
        Indica dónde ocurrió el hecho.
      </p>
    </div>

    <div className="field-group">
      <label className="field-label">Distrito (obligatorio)</label>
      <div className="field-box">
        <select
          className="field-input"
          value={draft.distrito}
          onChange={(e) => setDraft((prev) => ({ ...prev, distrito: e.target.value }))}
          style={{ background: 'transparent', color: draft.distrito ? 'var(--text)' : 'var(--text2)' }}
        >
          <option value="" disabled style={{ background: 'var(--surface)', color: 'var(--text2)' }}>
            Selecciona un distrito
          </option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d} style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="field-group">
      <label className="field-label">Dirección o referencia (obligatorio)</label>
      <div className="field-box">
        <input
          className="field-input"
          value={draft.direccion}
          onChange={(e) => setDraft((prev) => ({ ...prev, direccion: e.target.value }))}
          placeholder="Calle, número o referencia"
        />
      </div>
      <span className="field-help">Escribe y elige una sugerencia de la lista.</span>
    </div>

    <button
      type="button"
      className="btn-secondary"
      onClick={() => onOpenModal('permiso-ubicacion')}
    >
      Usar mi ubicación actual
    </button>

    {/* Mapa miniatura interactivo de ajuste */}
    <div
      onClick={() =>
        setDraft((prev) => ({
          ...prev,
          distrito: 'Miraflores, Lima',
          direccion: 'Av. José Larco cuadra 4 (frente al Parque Kennedy)',
        }))
      }
      style={{
        background: 'var(--primarysoft)',
        border: '1.5px solid var(--border)',
        height: 112,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <div style={{ position: 'absolute', background: 'var(--surface)', height: 10, left: 0, right: 0, top: 28 }} />
      <div style={{ position: 'absolute', background: 'var(--surface)', height: 8, left: 0, right: 0, top: 68 }} />
      <div style={{ position: 'absolute', background: 'var(--surface)', width: 10, top: 0, bottom: 0, left: '26%' }} />
      <div style={{ position: 'absolute', background: 'var(--surface)', width: 8, top: 0, bottom: 0, left: '68%' }} />
      <img src="/assets/map-pin.svg" alt="" width={32} height={32} style={{ position: 'relative', zIndex: 2 }} />
      <div style={{ position: 'relative', zIndex: 2, background: 'var(--surface)', padding: '4px 12px', borderRadius: 8, border: '1px solid var(--divider)' }}>
        <span className="t-13" style={{ fontWeight: 500 }}>Opcional: toca para ajustar el punto</span>
      </div>
    </div>

    <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-4')}>
      Continuar
    </button>
  </div>
);
