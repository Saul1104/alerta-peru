import React from 'react';
import { ReportDraft, ScreenId } from '../../types';

interface Props {
  screen: 'estado-en-revision' | 'estado-robo-atendido' | 'estado-asalto-atendido';
  draft: ReportDraft;
  onNavigate: (s: ScreenId) => void;
}

export const ReportStatusPage: React.FC<Props> = ({ screen, draft, onNavigate }) => {
  const isAtendido = screen !== 'estado-en-revision';
  const reportData = {
    'estado-en-revision': {
      code: 'AP-2026-0412',
      subtitle: `${draft.tipo} · ${draft.fecha}`,
      badge: 'Estado actual: En revisión',
      step3Status: 'Pendiente',
      step3Desc: 'Te avisaremos si cambia el estado.',
    },
    'estado-robo-atendido': {
      code: 'EJ-ROBO-001',
      subtitle: 'Robo · 08 / 10 / 2026 · Av. Larco cuadra 3, Miraflores',
      badge: 'Estado actual: Reporte atendido',
      step3Status: 'Completado el 09 / 10 / 2026',
      step3Desc: 'Atendido por Policía Nacional · Comisaría de Miraflores.',
    },
    'estado-asalto-atendido': {
      code: 'EJ-ASAL-002',
      subtitle: 'Asalto · 05 / 10 / 2026 · Av. Benavides cuadra 5, Miraflores',
      badge: 'Estado actual: Reporte atendido',
      step3Status: 'Completado el 06 / 10 / 2026',
      step3Desc: 'Atendido por Policía Nacional · Patrullaje integrado.',
    },
  }[screen];

  return (
    <div className="page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={() => onNavigate('historial')}
          style={{ width: 48, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/assets/chevron-left.svg" alt="Atrás" width={28} height={28} />
        </button>
        <h1 className="t-24" style={{ fontWeight: 700 }}>Estado del reporte</h1>
      </div>

      <div>
        <h2 className="t-22" style={{ fontWeight: 700 }}>{reportData.code}</h2>
        <p className="t-15" style={{ color: 'var(--text2)' }}>{reportData.subtitle}</p>
      </div>

      <div
        style={{
          alignSelf: 'flex-start',
          background: isAtendido ? 'var(--successsoft)' : 'var(--warnsoft)',
          border: `1.5px solid ${isAtendido ? 'var(--success)' : 'var(--warn)'}`,
          borderRadius: 24,
          padding: '10px 16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <img
          src={isAtendido ? '/assets/alert-check.svg' : '/assets/clock.svg'}
          alt=""
          width={20}
          height={20}
        />
        <span className="t-15" style={{ fontWeight: 600 }}>{reportData.badge}</span>
      </div>

      <h3 className="t-18" style={{ fontWeight: 700 }}>Seguimiento</h3>

      <div className="card-surface" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Paso 1 */}
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/check-white.svg" alt="" width={18} height={18} />
            </div>
            <div style={{ width: 2, height: 42, background: 'var(--divider)', margin: '4px 0' }} />
          </div>
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>Reporte enviado</p>
            <p className="t-13" style={{ fontWeight: 700, color: 'var(--success)' }}>Completado</p>
            <p className="t-14" style={{ color: 'var(--text2)' }}>Tu denuncia quedó registrada.</p>
          </div>
        </div>

        {/* Paso 2 */}
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: isAtendido ? 'var(--success)' : 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src="/assets/check-white.svg" alt="" width={18} height={18} />
            </div>
            <div style={{ width: 2, height: 42, background: 'var(--divider)', margin: '4px 0' }} />
          </div>
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>En revisión</p>
            <p className="t-13" style={{ fontWeight: 700, color: isAtendido ? 'var(--success)' : 'var(--primary)' }}>
              {isAtendido ? 'Completado' : 'En curso'}
            </p>
            <p className="t-14" style={{ color: 'var(--text2)' }}>Se está revisando la información.</p>
          </div>
        </div>

        {/* Paso 3 */}
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                background: isAtendido ? 'var(--success)' : 'var(--surface)',
                border: isAtendido ? 'none' : '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isAtendido && <img src="/assets/check-white.svg" alt="" width={18} height={18} />}
            </div>
          </div>
          <div>
            <p className="t-16" style={{ fontWeight: 600 }}>Reporte atendido</p>
            <p className="t-13" style={{ fontWeight: 700, color: isAtendido ? 'var(--success)' : 'var(--text2)' }}>
              {reportData.step3Status}
            </p>
            <p className="t-14" style={{ color: 'var(--text2)' }}>{reportData.step3Desc}</p>
          </div>
        </div>
      </div>

      <button className="btn-secondary" onClick={() => onNavigate('inicio')}>
        Volver al inicio
      </button>
    </div>
  );
};
