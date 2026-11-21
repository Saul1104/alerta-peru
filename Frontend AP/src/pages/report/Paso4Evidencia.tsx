import React from 'react';
import { ReportDraft, ScreenId } from '../../types';
import { ReportProgress } from './ProgresoDenuncia';

interface Props {
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
}

export const Step4EvidencePage: React.FC<Props> = ({ draft, setDraft, onNavigate }) => (
  <div className="page-container">
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onNavigate('denuncia-paso-3')}
        style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
      </button>
      <h1 className="t-24" style={{ fontWeight: 700 }}>Nueva denuncia</h1>
    </div>

    <ReportProgress step={4} pct={67} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <h2 className="t-22" style={{ fontWeight: 700 }}>Adjunta evidencia</h2>
      <p className="t-15" style={{ color: 'var(--text2)' }}>
        Opcional. Hasta 5 archivos de máximo 20 MB.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
      <button
        type="button"
        data-action="upload-foto"
        style={{
          background: 'var(--primarysoft)',
          border: '2px dashed var(--secondary)',
          borderRadius: 12,
          height: 92,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
        }}
      >
        <img src="/assets/camera.svg" alt="" width={28} height={28} />
        <span className="t-14" style={{ fontWeight: 600, color: 'var(--secondary)' }}>Tomar foto</span>
      </button>

      <button
        type="button"
        data-action="upload-galeria"
        style={{
          background: 'var(--primarysoft)',
          border: '2px dashed var(--secondary)',
          borderRadius: 12,
          height: 92,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
        }}
      >
        <img src="/assets/image.svg" alt="" width={28} height={28} />
        <span className="t-14" style={{ fontWeight: 600, color: 'var(--secondary)' }}>Galería</span>
      </button>

      <button
        type="button"
        data-action="upload-archivo"
        style={{
          background: 'var(--primarysoft)',
          border: '2px dashed var(--secondary)',
          borderRadius: 12,
          height: 92,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          cursor: 'pointer',
        }}
      >
        <img src="/assets/file-doc.svg" alt="" width={28} height={28} />
        <span className="t-14" style={{ fontWeight: 600, color: 'var(--secondary)' }}>Archivo</span>
      </button>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="t-16" style={{ fontWeight: 700 }}>Archivos adjuntos ({draft.archivos.length}/5)</span>
      <span className="t-13" style={{ color: 'var(--text2)' }}>Hasta 5 · máx. 20 MB</span>
    </div>

    {draft.archivos.length === 0 ? (
      <div className="card-surface" style={{ textAlign: 'center', padding: 28, color: 'var(--text2)' }}>
        <p className="t-14">No hay archivos adjuntos.</p>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {draft.archivos.map((f) => (
          <div key={f.id} className="card-bordered" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accentsoft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={f.tipo === 'archivo' ? '/assets/file-doc.svg' : '/assets/image.svg'} alt="" width={20} height={20} />
              </div>
              <div>
                <p className="t-15" style={{ fontWeight: 600 }}>{f.nombre}</p>
                <p className="t-12" style={{ color: 'var(--text2)' }}>{f.tamano} · Adjunto verificado</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDraft((prev) => ({ ...prev, archivos: prev.archivos.filter((x) => x.id !== f.id) }))}
              style={{ background: 'transparent', border: 'none', color: 'var(--danger)', fontWeight: 600, cursor: 'pointer' }}
              className="t-13"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    )}

    <button className="btn-primary" onClick={() => onNavigate('denuncia-paso-5')}>
      Continuar
    </button>
    <button
      type="button"
      onClick={() => onNavigate('denuncia-paso-5')}
      style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, height: 44, cursor: 'pointer' }}
      className="t-15"
    >
      Omitir este paso
    </button>
  </div>
);
