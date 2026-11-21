import React from 'react';
import { ModalType, ReportDraft, ScreenId } from '../../types';
import { ReportProgress } from './ProgresoDenuncia';

interface Props {
  draft: ReportDraft;
  setDraft: React.Dispatch<React.SetStateAction<ReportDraft>>;
  onNavigate: (s: ScreenId) => void;
  onOpenModal: (m: ModalType) => void;
}

export const Step6ReviewPage: React.FC<Props> = ({
  draft,
  setDraft,
  onNavigate,
  onOpenModal,
}) => {
  const rows = [
    { label: 'Tipo', value: draft.tipo || 'Sin completar', target: 'denuncia-paso-1' as ScreenId },
    { label: 'Descripción', value: draft.descripcion || 'Sin completar', target: 'denuncia-paso-2' as ScreenId },
    { label: 'Fecha y hora', value: `${draft.fecha} · ${draft.hora}`, target: 'denuncia-paso-2' as ScreenId },
    { label: 'Ubicación', value: `${draft.distrito} · ${draft.direccion}`, target: 'denuncia-paso-3' as ScreenId },
    {
      label: 'Evidencia',
      value: draft.archivos.length > 0 ? `${draft.archivos.length} archivo(s) adjunto(s)` : 'Archivos adjuntos (opcional)',
      target: 'denuncia-paso-4' as ScreenId,
    },
    {
      label: 'Identidad',
      value: draft.identidad === 'anonima' ? 'Anónima' : `Compartida (${draft.correo})`,
      target: 'denuncia-paso-5' as ScreenId,
    },
  ];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('denuncia-paso-5')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>Revisar denuncia</h1>
      </div>

      <ReportProgress step={6} pct={100} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h2 className="t-22" style={{ fontWeight: 700 }}>Confirma la información</h2>
        <p className="t-15" style={{ color: 'var(--text2)' }}>Revisa antes de enviar.</p>
      </div>

      <div className="card-surface" style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column' }}>
        {rows.map((r, i) => (
          <React.Fragment key={r.label}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="t-13" style={{ color: 'var(--text2)' }}>{r.label}</p>
                <p className="t-16" style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.value}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate(r.target)}
                style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', padding: '8px' }}
                className="t-15"
              >
                Editar
              </button>
            </div>
            {i < rows.length - 1 && <div style={{ height: 1, background: 'var(--divider)' }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <button
          type="button"
          onClick={() => setDraft((prev) => ({ ...prev, confirmado: !prev.confirmado }))}
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: draft.confirmado ? 'var(--primary)' : 'var(--surface)',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {draft.confirmado && <img src="/assets/check-white.svg" alt="" width={16} height={16} />}
        </button>
        <p className="t-14">
          Confirmo que los datos son correctos. Entiendo que un reporte falso puede tener consecuencias legales.
        </p>
      </div>

      <button className="btn-primary" onClick={() => onNavigate('enviando-denuncia')}>
        Enviar denuncia
      </button>

      <button className="btn-secondary" onClick={() => onOpenModal('cancelar-envio')}>
        Cancelar envío
      </button>
    </div>
  );
};
